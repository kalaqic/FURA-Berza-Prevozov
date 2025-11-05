# EmailJS Setup Guide for FURA

## Quick Setup (5 minutes)

### 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email

### 2. Create Email Service
1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose **Gmail** (or your preferred email provider)
4. Follow the setup instructions
5. **Copy the Service ID** (you'll need this)

### 3. Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template:

**Subject:** `Potrditev registracije - FURA`

**Content:**
```
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #2c3e50; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
    <h1 style="margin: 0; text-align: center;">FURA</h1>
    <p style="margin: 10px 0 0 0; text-align: center; opacity: 0.8;">Transport Sharing Platform</p>
  </div>
  
  <div style="background-color: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px;">
    <h2 style="color: #2c3e50; margin-top: 0;">Pozdravljeni {{to_name}}!</h2>
    
    <p>Hvala za registracijo na FURA platformi. Za dokončanje registracije potrebujemo potrditev vašega e-poštnega naslova.</p>
    
    <div style="background-color: white; padding: 25px; border-radius: 8px; margin: 25px 0; text-align: center; border: 2px solid #e74c3c;">
      <h3 style="color: #2c3e50; margin-top: 0;">Vaša potrditvena koda:</h3>
      <div style="font-size: 36px; font-weight: bold; color: #e74c3c; letter-spacing: 8px; margin: 15px 0;">
        {{verification_code}}
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
```

4. **Copy the Template ID** (you'll need this)

### 4. Get Your User ID
1. Go to **Account** → **General**
2. **Copy your User ID**

### 5. Update Your Code
In `js/auth.js`, replace these lines:

```javascript
// Replace line 92
emailjs.init('YOUR_EMAILJS_USER_ID'); // Replace with your User ID

// Replace line 105
'YOUR_SERVICE_ID', // Replace with your Service ID

// Replace line 106  
'YOUR_TEMPLATE_ID', // Replace with your Template ID
```

### 6. Test
1. Register a new user
2. Check your email for the verification code
3. Enter the code in the verification modal

## Example Configuration

After setup, your code should look like this:

```javascript
// EmailJS configuration
emailjs.init('user_abc123xyz'); // Your User ID

// Send email using EmailJS
const response = await emailjs.send(
  'service_gmail123', // Your Service ID
  'template_verification456', // Your Template ID
  templateParams
);
```

## Free Limits

- **200 emails/month** free
- **Perfect for development and small production use**
- Upgrade to paid plans for higher limits

## Troubleshooting

### If emails don't send:
1. Check browser console for errors
2. Verify your Service ID and Template ID are correct
3. Make sure your email service is properly configured
4. Check spam folder

### If verification modal doesn't appear:
1. Check browser console for errors
2. Make sure all scripts are loading properly
3. Try refreshing the page

## Ready to Go!

Once you've completed the setup, emails will be sent to `davidkalabic777@gmail.com` and the verification modal will appear automatically after registration!
