# Purpose of the exercise
Realize a lazy select component to load options from a given remote source
Naming: SelectUniversity
Props: label, disabled, onObjectSelected

# Tech Stack
-React
-Typescript
-HTML
-CSS

# Approach
I focused my attention on applying an optimization technique to reduce the number of api calls when writing to the input (debounce technique)
Realize and use a custom hooks
BEM for css class names

# IMPROVEMENTS
Apply virtualization/infinite scrolling or server pagination to results dropdown component in order to optimize performance 
The component could be made reusable by providing additional prop for api call

# Note
Missing tests

# Start Project
In the project directory run:
1) npm install
2) npm run dev

Thanks for your attention!!