# Pathfinder React App

Welcome to my pathfinding app. The idea behind creating this app was to use only React and state to excute and represent common pathfinding algorithms.

## Pathfinding algorithms

### Depth First Search

The most common way to traverse nodes and node trees. You traverse nodes until you get to null. After you reach null you go back to the frist available node with a path. You do this until you have traversed all nodes available. Very bad stratgy for finding the best path but if you want to traverse every node and track some information this will reach everynode. 

### Dijkstra's

Non-weighted algorithm to find the shortest possible path. Dijsktras looks at the current node visits all of its neighbors(for this application anything that isnt a wall or out of bounds 1 move away). It adds current traveled steps and length of travel to neighbor node, always making sure that its keeps the minimun moves traveled, and moves its current node to the node with shortest distance traveled to reach it. continues to do so until we reach then end or run out of nodes available. It will find the shortest path but not in the shortest amount of nodes visited.

### A star

Weighted algorithm that always finds the shorest path. Astar takes two values, g score and f score, g score is total steps taken to reach current node and f score is g score plus estimated distance to end using a heuristic function, in this case its a simple (x1-x2) / (y1-y2). Its moves from current to next node by taking the current neighbors and calculating there f and g scores, adding them to unvisited, then sorting unvisited by lowest to highest and moving to the lowest f score. A star is the most common pathfinding algorithm and gaurantees the shortest path with minimal steps taken.


The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
