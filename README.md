# Rental-Finder-Tool
Repository for rental finder chrome extension 

Used https://web-highlights.com/blog/how-to-build-a-chrome-extension-using-react/#:~:text=How%20To%20Build%20A%20Chrome%20Extension%20Using%20React,the%20beginning%2C%20we%20already%20installed%20our%20extension.%20 to generate base extension with React 

# Setting up the project 
Clone repository
cd to "react-chrome-app" and run "npm install"
next, run "npm i -D webpack ts-loader webpack-cli"
next, run "npm run build" 

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


