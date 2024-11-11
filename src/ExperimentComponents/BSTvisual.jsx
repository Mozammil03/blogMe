import React, { useEffect, useState } from "react";
import Button from "../components/Button";
// import "./index.css";

class Node {
  constructor(key, x, y) {
    this.key = key;
    this.x = x;
    this.y = y;
    this.left = null;
    this.right = null;
  }
}

const BSTvisual = () => {
  const [root, setRoot] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [val, setVal] = useState("");
  const [gen, setGen] = useState(10);
  const [delKey, setDelKey] = useState("");

  // Delete function
  const deleteNode = (key) => {
    setRoot((prevRoot) => {
      const newRoot = deleteNodeRec(prevRoot, key, 0, 0);
      updateVisualTree(newRoot);
      return newRoot;
    });
  };

  const deleteNodeRec = (node, key, x, y, depth = 0) => {
    if (node === null) return null;

    const comp = key - node.key;
    const newY = y + 60; // Adjusts vertical spacing between levels
    const horizontalSpacing = 10 / (depth + 1); // Dynamically reduce spacing with depth

    if (comp < 0) {
      node.left = deleteNodeRec(
        node.left,
        key,
        x - horizontalSpacing,
        newY,
        depth + 1
      );
    } else if (comp > 0) {
      node.right = deleteNodeRec(
        node.right,
        key,
        x + horizontalSpacing,
        newY,
        depth + 1
      );
    } else {
      if (node.left == null) return node.right;
      if (node.right == null) return node.left;

      const successor = minNode(node.right);
      node.key = successor.key;
      node.right = deleteNodeRec(
        node.right,
        successor.key,
        x + horizontalSpacing,
        newY,
        depth + 1
      );
    }
    return node;
  };

  const minNode = (node) => {
    let current = node;
    while (current.left !== null) current = current.left;
    return current;
  };

  // Insert function
  const insert = (key) => {
    setRoot((prevRoot) => {
      const newRoot = insertRec(prevRoot, key, 0, 0);
      updateVisualTree(newRoot);
      return newRoot;
    });
  };

  const insertRec = (node, key, x, y, depth = 0) => {
    if (node === null) return new Node(key, x, y);

    const comp = key - node.key;
    const newY = y + 60;
    const horizontalSpacing = 10 / (depth + 1);

    if (comp < 0) {
      node.left = insertRec(
        node.left,
        key,
        x - horizontalSpacing,
        newY,
        depth + 1
      );
    } else if (comp > 0) {
      node.right = insertRec(
        node.right,
        key,
        x + horizontalSpacing,
        newY,
        depth + 1
      );
    }
    return node;
  };

  const inorderRec = (node) => {
    if (node === null) return;
    inorderRec(node.left);
    setNodes((prevNodes) => [
      ...prevNodes,
      <div
        style={{
          position: "absolute",
          zIndex: 1000,
          left: `${node.x + 50}%`,
          top: `${node.y + 50}px`,
          opacity: 1,
          animation: "fade-in 0.5s forwards",
        }}
        className="node p-1 h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center"
        key={node.key}
      >
        {node.key}
      </div>,
    ]);
    inorderRec(node.right);
  };

  // Refreshes visual nodes and edges
  const updateVisualTree = (currentRoot) => {
    setNodes([]);
    setEdges([]);
    inorderRec(currentRoot);
    logNodePositions(currentRoot);
  };

  useEffect(() => {
    if (root) updateVisualTree(root);
  }, [root]);

  const generateRandomly = (count) => {
    let n = nodes.length;
    while (n < count) {
      const rand = Math.floor(Math.random() * 100);
      insert(rand);
      n++;
    }
  };

  const logNodePositions = (node, depth = 0) => {
    if (node === null) return;
    logNodePositions(node.left, (depth -= 0.08));

    if (node.left) {
      setEdges((prevEdges) => [
        ...prevEdges,
        <div
          style={{
            width: `${5 + depth}rem`,
            position: "absolute",
            left: `${(node.x + node.left.x) / 2 + 50 - 1}%`,
            top: `${(node.y + node.left.y) / 2 + 50 + 15}px`,
            transform: `rotate(${
              Math.atan2(node.left.y - node.y, node.left.x - node.x) +
              0.8 +
              depth
            }rad)`,
            opacity: 1,
            animation: "fade-in 0.5s forwards",
          }}
          className="edge h-[6px] bg-green-500"
          key={`${node.key}-${node.left.key}`}
        ></div>,
      ]);
    }

    if (node.right) {
      setEdges((prevEdges) => [
        ...prevEdges,
        <div
          style={{
            width: `${5 + depth}rem`,
            position: "absolute",
            left: `${(node.x + node.right.x) / 2 + 50 - 1}%`,
            top: `${(node.y + node.right.y) / 2 + 50 + 15}px`,
            transform: `rotate(${
              Math.atan2(node.right.y - node.y, node.right.x - node.x) -
              0.55 +
              depth
            }rad)`,
            opacity: 1,
            animation: "fade-in 0.5s forwards",
          }}
          className="edge h-[6px] bg-black"
          key={`${node.key}-${node.right.key}`}
        ></div>,
      ]);
    }

    logNodePositions(node.right);
  };

  // Input handling
  const handleChange = (e) => setVal(e.target.value);

  const handleInsert = (e) => {
    e.preventDefault();
    const key = parseInt(val);
    if (!isNaN(key)) {
      insert(key);
      setVal("");
    }
  };

  const clearTree = () => {
    setNodes([]);
    setEdges([]);
    setRoot(null);
    setVal("");
    setDelKey("");
    setGen(10);
  };

  const handleGenChange = (e) => {
    const value = parseInt(e.target.value);
    setGen(isNaN(value) ? "" : value);
  };

  const handleDelKeyChange = (e) => {
    const value = parseInt(e.target.value);
    setDelKey(isNaN(value) ? "" : value);
  };

  return (
    <div className="h-[100%] w-[100%] bg-blue-200 flex flex-col">
      <h1>Binary Search Tree Visualization</h1>
      <div className="flex flex-row w-[100%] relative bg-yellow-200">
        <div className="w-[100%] h-[100vh]">
          {nodes.map((node) => node)}
          {edges.map((edge) => edge)}
        </div>
        <div className="w-[20%] flex-col justify-center text-center bg-blue-500">
          <div className="scale-75">
            <form onSubmit={handleInsert}>
              <label>
                <input
                  className="w-20"
                  type="text"
                  onChange={handleChange}
                  value={val}
                  placeholder="Enter a key"
                />
              </label>
              <button type="submit">
                <Button>Insert</Button>
              </button>
            </form>
          </div>
          <div className="flex scale-75 justify-center">
            <input
              className="w-20"
              type="text"
              onChange={handleGenChange}
              value={gen}
            />
            <div onClick={() => generateRandomly(gen)}>
              <Button>Generate Random</Button>
            </div>
          </div>
          <div className="scale-75 flex justify-center">
            <input
              className="w-20"
              type="text"
              onChange={handleDelKeyChange}
              value={delKey}
            />
            <div onClick={() => deleteNode(parseInt(delKey))}>
              <Button>Delete</Button>
            </div>
          </div>
          <div className="scale-75" onClick={clearTree}>
            <Button>Clear</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BSTvisual;
