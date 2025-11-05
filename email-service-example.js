/**
 * Firebase Cloud Function Example for Email Verification
 * This is an example of how to implement email sending in production
 * 
 * To use this:
 * 1. Install Firebase CLI: npm install -g firebase-tools
 * 2. Initialize Firebase Functions: firebase init functions
 * 3. Install dependencies: npm install nodemailer
 * 4. Deploy: firebase deploy --only functions
 */

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

// Initialize Firebase Admin
admin.initializeApp();

// Email configuration (use environment variables in production)
const emailConfig = {
  service: 'gmail', // or use your SMTP settings
  auth: {
    user: functions.config().email?.user || 'your-email@gmail.com',
    pass: functions.config().email?.password || 'your-app-password'
  }
};

// Create transporter
const transporter = nodemailer.createTransporter(emailConfig);

/**
 * Cloud Function to send verification email
 * Triggered when a new user document is created with emailVerified: false
 */
exports.sendVerificationEmail = functions.firestore
  .document('users/{userId}')
  .onCreate(async (snap, context) => {
    const userData = snap.data();
    
    // Only send email if user is not verified and has verification code
    if (userData.emailVerified === false && userData.verificationCode) {
      try {
        // Email template
        const emailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #2c3e50; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; text-align: center;">FURA</h1>
              <p style="margin: 10px 0 0 0; text-align: center; opacity: 0.8;">Transport Sharing Platform</p>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px;">
              <h2 style="color: #2c3e50; margin-top: 0;">Pozdravljeni ${userData.firstName}!</h2>
              
              <p>Hvala za registracijo na FURA platformi. Za dokončanje registracije potrebujemo potrditev vašega e-poštnega naslova.</p>
              
              <div style="background-color: white; padding: 25px; border-radius: 8px; margin: 25px 0; text-align: center; border: 2px solid #e74c3c;">
                <h3 style="color: #2c3e50; margin-top: 0;">Vaša potrditvena koda:</h3>
                <div style="font-size: 36px; font-weight: bold; color: #e74c3c; letter-spacing: 8px; margin: 15px 0;">
                  ${userData.verificationCode}
                </div>
              </div>
              
              <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 6px; margin: 20px 0;">
                <p style="margin: 0; color: #856404;">
                  <strong>Navodila:</strong><br>
                  1. Vrnite se v aplikacijo<br>
                  2. Vnesite zgornjo 6-mestno kodo<br>
                  3. Koda je veljavna 15 minut
                </p>
              </div>
              
              <p style="color: #666; font-size: 14px; margin-bottom: 0;">
                Če se niste registrirali na FURA platformi, to sporočilo prezrite.<br>
                Za pomoč nas kontaktirajte na: info@fura.si
              </p>
            </div>
          </div>
        `;
        
        // Email options
        const mailOptions = {
          from: '"FURA Platform" <noreply@fura.si>',
          to: userData.email,
          subject: 'Potrditev registracije - FURA',
          html: emailHtml,
          text: `Pozdravljeni ${userData.firstName}!\n\nVaša potrditvena koda je: ${userData.verificationCode}\n\nVnesite to kodo v aplikaciji za dokončanje registracije.\n\nKoda je veljavna 15 minut.\n\nFURA Team`
        };
        
        // Send email
        await transporter.sendMail(mailOptions);
        console.log(`Verification email sent to ${userData.email}`);
        
      } catch (error) {
        console.error('Error sending verification email:', error);
        throw error;
      }
    }
  });

/**
 * Alternative: HTTP Cloud Function for sending emails
 * You can call this from your frontend
 */
exports.sendEmailVerification = functions.https.onCall(async (data, context) => {
  // Verify user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }
  
  const { email, firstName, verificationCode } = data;
  
  if (!email || !firstName || !verificationCode) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing required fields');
  }
  
  try {
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2c3e50;">Pozdravljeni ${firstName}!</h2>
        <p>Vaša potrditvena koda za FURA je:</p>
        <div style="font-size: 32px; font-weight: bold; color: #e74c3c; text-align: center; letter-spacing: 5px;">
          ${verificationCode}
        </div>
        <p>Vnesite to kodo v aplikaciji za dokončanje registracije.</p>
      </div>
    `;
    
    const mailOptions = {
      from: '"FURA Platform" <noreply@fura.si>',
      to: email,
      subject: 'Potrditev registracije - FURA',
      html: emailHtml
    };
    
    await transporter.sendMail(mailOptions);
    return { success: true };
    
  } catch (error) {
    console.error('Error sending email:', error);
    throw new functions.https.HttpsError('internal', 'Failed to send email');
  }
});

/**
 * Environment Variables Setup:
 * 
 * firebase functions:config:set email.user="your-email@gmail.com"
 * firebase functions:config:set email.password="your-app-password"
 * 
 * For Gmail:
 * 1. Enable 2-factor authentication
 * 2. Generate an "App Password" 
 * 3. Use the app password instead of your regular password
 */
