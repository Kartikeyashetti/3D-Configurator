import { Canvas } from "@react-three/fiber";
import { useState, useRef, useEffect } from "react";
import { OrbitControls, TransformControls } from "@react-three/drei";
import Header from "../src/Blocks/Header/header";
import Menu from "../src/Blocks/Menu/Menu";
import Home from "./3D/home/home";
import Chair from "./3D/chair";
import Table from "./3D/table";
export default function App() {
  const [selectedChair, setSelectedChair] = useState("chair1"); // default chair
  const [selectedTable, setSelectedTable] = useState("table1"); // default table

  const [chairActive, setChairActive] = useState(false);
  const [tableActive, setTableActive] = useState(false);

  const chairRef = useRef();
  const tableRef = useRef();

  const chairModels = {
    chair1: import.meta.env.BASE_URL + "GLTF/Chairs/smoothChairLowpoly.gltf",
    chair2: import.meta.env.BASE_URL + "GLTF/Chairs/Sofaa3.gltf",
    chair3: import.meta.env.BASE_URL + "GLTF/Chairs/SofaResizeLowpoly.gltf",
  };

  const tableModels = {
    table1: import.meta.env.BASE_URL + "GLTF/table/table5/table5.gltf",
    table2: import.meta.env.BASE_URL + "GLTF/table/table4/table4.gltf",
    table3: import.meta.env.BASE_URL + "GLTF/table/table1/table.gltf",
  };



  // Reset transforms when switching chair
  useEffect(() => {
    setChairActive(false);
    if (chairRef.current) {
      chairRef.current.rotation.set(0, 0, 0); // reset rotation
    }
  }, [selectedChair]);

  // Reset transforms when switching table
  useEffect(() => {
    setTableActive(false);
    if (tableRef.current) {
      tableRef.current.rotation.set(0, 0, 0); // reset rotation
    }
  }, [selectedTable]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Header />

      <div style={{ display: "flex", width: "100%", height: "80vh" }}>
        <div style={{ width: "80vw", height: "80vh" }}>
          <Canvas
            camera={{ position: [3, 3, 3], fov: 50 }}
            onPointerMissed={(e) => {
              if (e.button === 0) {
                setChairActive(false);
                setTableActive(false);
              }
            }}
          >
            <ambientLight intensity={0.75} />
            <directionalLight position={[5, 5, 5]} intensity={6} />

            <Home scale={2} position={[0, -1, 0]} />

            {/* Chair */}
            <Chair
              ref={chairRef}
              modelPath={chairModels[selectedChair]}
              scale={2.0}
              position={[1, -1, 0]}
              onClick={(e) => {
                e.stopPropagation();
                setChairActive(true);
                setTableActive(false); // only one active at a time
              }}
            />
            {chairActive && chairRef.current && (
              <TransformControls object={chairRef.current} mode="rotate" />
            )}

            {/* Table */}
            <Table
              ref={tableRef}
              modelPath={tableModels[selectedTable]}
              scale={2.0}
              position={[-1.7, -1, 0]}
              onClick={(e) => {
                e.stopPropagation();
                setTableActive(true);
                setChairActive(false); // only one active at a time
              }}
            />
            {tableActive && tableRef.current && (
              <TransformControls object={tableRef.current} mode="rotate" />
            )}

            <OrbitControls makeDefault />
          </Canvas>
        </div>

        {/* Menu with chair + table configs */}
        <Menu
          selectedChair={selectedChair}
          setSelectedChair={setSelectedChair}
          selectedTable={selectedTable}
          setSelectedTable={setSelectedTable}
        />
      </div>
    </div>
  );
}
