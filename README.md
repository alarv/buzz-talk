# Chat Analyzer CLI and Web Interface

## Overview

This project includes both a command-line interface (CLI) and a web interface for parsing, analyzing, and filtering chat logs from public channels. The goal was to create a solution that demonstrates the capabilities to fetch and filter informative messages based on user preferences and specified patterns.

## Implementation Details

### Tech Stack

- **Node.js**: Chosen for both the frontend and backend to facilitate the reuse of backend classes for file processing logic.
- **Webpack**: Used as a bundler to generate a single `index.js` file for the shell script, ensuring a streamlined deployment and execution process.
- **Jest**: Integrated for testing to leverage its comprehensive testing features and ease of use.
- **Next.js**: Utilized for the web interface due to its robust features and familiarity.
- **Tailwind CSS**: Used for styling the web interface to quickly approach the given design mockups.

### Features

1. **CLI Tool**:
    - Built with Node.js.
    - Bundled using Webpack for simplicity and familiarity.
    - Command to build: `npm run script:build`.
    - Command to execute: `./dist/script.js --help` or `./dist/script.js -d dist/inputs -r "dist/rules-part 2"` or via the npm script `npm run script -- -d dist/inputs -r "dist/rules-part 2"`

2. **Regex Rules Flag**:
    - The `--regex` flag allows the use of regex patterns in the rules file for advanced message filtering.

3. **Extensibility**:
    - Designed with extensibility in mind, particularly through the use of the `RuleStrategy` interface.
    - Adopts an OOP approach with class-based architecture similar to NestJS, ensuring single responsibilities and adherence to OOP principles.

4. **Testing**:
    - Manual testing complemented with automated tests using Jest, as defined in `index.spec.ts`.
    - Babel dependencies included to support Jest's requirements.

5. **Web Interface**:
    - Developed with Next.js and Tailwind CSS.
    - Leverages the latest app router from Next.js, following the shift from the deprecated `create-react-app`.
    - A more polished UI could be achieved with additional time.

6. **Performance Optimization (Optional)**:
    - Proposed an LRU (Least Recently Used) cache implementation for performance optimization.
    - The cache would store frequently occurring messages, significantly reducing the need for expensive regex computations.
    - Didn't get to implement this part as I've already spent 4 hours on the project

## Project Setup

To set up the project locally, follow these steps:

1. Clone the repository to your local machine.
2. If you're using nvm run `nvm use` to use the version defined in the .nvmrc (`lts/hydrogen
   `)
3. Navigate to the project directory and run `npm install` to install dependencies.
4. To build the CLI tool, run `npm run script:build`.
5. Execute the CLI with `node index.js` followed by the required arguments.
6. To start the web interface, run `npm run dev` and navigate to `http://localhost:3000` in your web browser.

## Testing

To run the automated tests, execute `npm test` in the project directory.

## Future Improvements

- **Package Extraction**: Given more time, the core logic of the chat analyzer could be extracted into a separate NPM package for better modularity.
- **UI Refinement**: Additional time would allow for a more refined UI, closely matching the provided design mockups.
- **LRU Cache Integration**: Implementing the LRU cache would enhance performance by avoiding redundant computations for common messages.

## Acknowledgements

This project was developed within a 4-hour window as part of a coding exercise. It represents a balance between functionality, performance, and development speed.
