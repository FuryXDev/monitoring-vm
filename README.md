# Monitoring VM Performance Script

## Description
This project contains a script that monitors the performance of KVM virtual machines (VMs). It tracks CPU, RAM, and disk usage, sending alerts via email or SMS when resource usage exceeds predefined thresholds.

## Prerequisites

- Node.js (>=12.x)
- Twilio account (for SMS alerts, optional)
- SMTP account (for email alerts, optional)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your_username/monitoring-vm.git
   cd monitoring-vm
   ```
2. Install the required dependencies:
   ```bash
    npm install ps-node nodemailer twilio
   ```

3. Configure the `config.js` file with your SMTP or Twilio credentials.

4. Run the script:

   ```bash
    npm start
   ```
  
## Configuration

1. In the config.js file, set your preferred method of notification (either email or sms).
2. For email notifications, provide your SMTP server details (e.g., Gmail, Yahoo).
3. For SMS notifications, set up a Twilio account and provide your accountSid, authToken, and phone numbers.




