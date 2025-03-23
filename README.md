# Rental-Finder-Tool
Repository for rental finder chrome extension.

This browser extension aims to simplify the rental property search process in Australia by automating the assessment of a renter's suitability for properties and helping them manage their favourite listings across multiple rental websites.

# Key Features:
- Unbiased Property Suitability Ratings: The extension generates property ratings based on a user’s specific preferences, helping renters make informed decisions without the influence of listing bias.

- Centralized Property Management: Save and track favourite listings from different rental platforms all in one place, reducing the time spent browsing multiple websites.

- Streamlined Decision-Making: By cutting through the clutter and presenting only relevant information, the extension helps renters make quicker and more informed choices, saving valuable time in the process.

# Current Status
This project is currently in development. The MVP (Minimum Viable Product) has been completed, and work is ongoing to enhance property rating algorithms, improve the user interface, and integrate with additional rental platforms to broaden user engagement.


# Extension Set-Up
Used https://web-highlights.com/blog/how-to-build-a-chrome-extension-using-react/#:~:text=How%20To%20Build%20A%20Chrome%20Extension%20Using%20React,the%20beginning%2C%20we%20already%20installed%20our%20extension.%20 to generate base extension with React 

# Setting up the project 
1. Clone repository
2. cd to "react-chrome-app" and run "npm install"
3. run "npm i -D webpack ts-loader webpack-cli" and "npm install --save-dev file-loader url-loader"
4. run "npm run build" 
5. cd to "backend" and run "npm install axios"
6. create a .env file in backend, and store open AI and google API keys as OPENAI_API_KEY and GOOGLE_API_KEY respectively
7. run "npm start"

# Installing the Extension 
1. To install the extension, navigate to chrome://extensions and select "developer mode"
Select "load unpacked" and navigate to the extension directory 
2. Build the react app by running "npm run build" or "yarn build" 
3. Open a new tab to view the output 

# Testing Changes 
Option 1 - view changes as extension 
1. After making changes, save locally 
2. Re-build the react app by running "npm run build" or "yarn build" 
3. Navigate to chrome://extensions and select reload for this extension 
4. Open a new tab in chrome 

Option 2 - view changes as react app
1. Run "npm start"
2. Save changes locally 
** note that changes that are built correctly here may not correctly link with chrome extension .. would recommend going with option 1 for this reason 


