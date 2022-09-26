# Pathfinder React App

Welcome to my pathfinding app. The idea behind creating this app was to use only React and state to excute and represent common pathfinding algorithms.

## Pathfinding algorithms

### Depth First Search

The most common way to traverse nodes and node trees. You traverse nodes until you get to null. After you reach null you go back to the frist available node with a path. You do this until you have traversed all nodes available. Very bad stratgy for finding the best path but if you want to traverse every node and track some information this will reach every node. 

### Dijkstra's

Non-weighted algorithm to find the shortest possible path. Dijsktras looks at the current node, visits all of its neighbors(for this application anything that isnt a wall or out of bounds 1 move away). It adds current traveled steps and length of travel to neighbor node, always making sure that its keeps the minimun moves traveled, and moves its current node to the node with shortest distance traveled to reach it. It continues to do so until we reach then end or run out of nodes available. It will find the shortest path but not in the shortest amount of nodes visited.

### A star

Weighted algorithm that always finds the shorest path. Astar takes two values, g score and f score, g score is total steps taken to reach current node and f score is g score plus estimated distance to end using a heuristic function, in this case its a simple (x1-x2) / (y1-y2). Its moves from current to next node by taking the current neighbors and calculating there f and g scores, adding them to unvisited, then sorting unvisited by lowest to highest and moving to the lowest f score. A star is the most common pathfinding algorithm and gaurantees the shortest path with minimal steps taken.

## Maze Algorithms

### Random

Very simple algorithm that gives a 50/50 chance that a node will be a wall. Simple but does not gaurentee a path to every node

### Recursive Division

Takes the current grid and divides vertically or horizontally randomly and then cooses a random point to build the wall leaving an "exit" in each wall until every divided grid has a width or a height of 1. Every node that is not a wall is reachable by every other node.

## Test it out

https://diggy63.github.io/PathfinderReact/

## IceBox

- More maze building algorithms
- Working on Mobile
- Making the page feel more intuitive

