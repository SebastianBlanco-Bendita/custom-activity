const express = require('express');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();

// Initialize the Gemini AI Client
// Ensure you have a .env file with your GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Middleware to serve static files (HTML, JS, CSS)
app.use(express.static(__dirname + '/public')); // Best practice to keep public files in a /public folder
app.use(express.json()); // Modern Express replacement for bodyParser

// --- ACTIVITY LIFECYCLE ROUTES ---

/**
 * EXECUTE Route: Called for each contact that hits the activity.
 */
app.post('/execute', async (req, res) => {
    console.log('--- RECEIVED EXECUTE REQUEST ---');
    console.log('Request Body:', JSON.stringify(req.body, null, 2));

    try {
        const args = req.body.inArguments[0];
        
        // --- 1. Extract Data from Journey Builder ---
        const { contactKey, firstName, city, interestCategory, email, promptTemplate, emailTone } = args;

        console.log(`Processing contact: ${firstName} (Key: ${contactKey}) for email: ${email}`);
        
        // --- 2. Engineer the Prompt for Gemini ---
        const prompt = `
            You are an expert marketing copywriter. Your task is to write a personalized email.
            
            **Customer Details:**
            - Name: ${firstName}
            - City: ${city}
            - Main Interest: ${interestCategory}
            
            **Instructions:**
            - The email's tone must be: **${emailTone}**.
            - Use this core message as your guide: "${promptTemplate}".
            - Address the customer by their first name.
            - Mention their interest (${interestCategory}) and potentially their city (${city}) to make it feel highly personal.
            - The output must be a valid JSON object with two keys: "subject" and "body". The body must be simple HTML.
            
            Example JSON output: {"subject": "A Special Offer Just For You, ${firstName}!", "body": "<p>Hi ${firstName}, we noticed you're interested in ${interestCategory}...</p>"}
        `;

        // --- 3. Call the Gemini API ---
        console.log('Sending prompt to Gemini...');
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        // Clean up the text response from Gemini to ensure it's valid JSON
        let text = response.text();
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        console.log('Received response from Gemini:', text);
        
        // --- 4. Parse the AI-generated content ---
        const emailContent = JSON.parse(text);

        // --- 5. Send the Email (Simulation) ---
        // In a real scenario, you would call the SFMC Transactional Messaging API,
        // or another email service provider (like SendGrid, Mailgun) here.
        console.log('--- SIMULATING EMAIL SEND ---');
        console.log(`TO: ${email}`);
        console.log(`SUBJECT: ${emailContent.subject}`);
        console.log('BODY (HTML):');
        console.log(emailContent.body);
        console.log('--- END OF SIMULATION ---');

        res.status(200).send({ success: true });

    } catch (error) {
        console.error('Error during execution:', error);
        res.status(500).send({ success: false, error: error.message });
    }
});

// The rest of the lifecycle routes remain the same
app.post('/save', (req, res) => {
    console.log('--- RECEIVED SAVE REQUEST ---');
    res.status(200).send({ success: true });
});

app.post('/publish', (req, res) => {
    console.log('--- RECEIVED PUBLISH REQUEST ---');
    res.status(200).send({ success: true });
});

app.post('/validate', (req, res) => {
    console.log('--- RECEIVED VALIDATE REQUEST ---');
    res.status(200).send({ success: true });
});

app.post('/stop', (req, res) => {
    console.log('--- RECEIVED STOP REQUEST ---');
    res.status(200).send({ success: true });
});

// Serve the UI for the activity
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Gemini Custom Activity server listening on port ${PORT}`);
});