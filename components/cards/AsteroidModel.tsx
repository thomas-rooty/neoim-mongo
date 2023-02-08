import {useGLTF} from '@react-three/drei'
import {useRef, useEffect, useState} from "react";
import {useFrame, useLoader} from "@react-three/fiber";
// @ts-ignore
import {TextureLoader} from "three/src/loaders/TextureLoader";

interface AsteroidModelProps {
  wireframe: boolean;
}

const AsteroidModel = ({wireframe}: AsteroidModelProps) => {
  // Load texture
  const [colorMap, normalMap, roughnessMap, aoMap] = useLoader(TextureLoader, [
    '/assets/asteroids/textures/Mat1_Base_Color.jpg',
    '/assets/asteroids/textures/Mat1_Normal_DirectX.jpg',
    '/assets/asteroids/textures/Mat1_Roughness.jpg',
    '/assets/asteroids/textures/Mat1_Mixed_AO.jpg',
  ]);

  const [asteroidNumber, setAsteroidNumber] = useState(0);
  useEffect(() => {
    // Generate a random number from 1 to 10
    setAsteroidNumber(Math.floor(Math.random() * 10) + 1);
  }, []);

  // Create a reference to every asteroid
  const asteroid1 = useRef();
  const asteroid2 = useRef();
  const asteroid3 = useRef();
  const asteroid4 = useRef();
  const asteroid5 = useRef();
  const asteroid6 = useRef();
  const asteroid7 = useRef();
  const asteroid8 = useRef();
  const asteroid9 = useRef();
  const asteroid10 = useRef();

  // Hide all asteroids except the one with the random number
  useFrame(() => {
    // @ts-ignore
    asteroid1.current.visible = asteroidNumber === 1;
    // @ts-ignore
    asteroid2.current.visible = asteroidNumber === 2;
    // @ts-ignore
    asteroid3.current.visible = asteroidNumber === 3;
    // @ts-ignore
    asteroid4.current.visible = asteroidNumber === 4;
    // @ts-ignore
    asteroid5.current.visible = asteroidNumber === 5;
    // @ts-ignore
    asteroid6.current.visible = asteroidNumber === 6;
    // @ts-ignore
    asteroid7.current.visible = asteroidNumber === 7;
    // @ts-ignore
    asteroid8.current.visible = asteroidNumber === 8;
    // @ts-ignore
    asteroid9.current.visible = asteroidNumber === 9;
    // @ts-ignore
    asteroid10.current.visible = asteroidNumber === 10;
    // @ts-ignore
  });

  // Create a reference to the asteroid model
  const {nodes, materials} = useGLTF("/assets/asteroids/model/asteroids.gltf");
  return (
    <group dispose={null} scale={[0.6, 0.6, 0.6]}>
      <mesh
        ref={asteroid1}
        castShadow
        receiveShadow
        geometry={nodes.Asteroid_no_1.geometry}
        material={materials["Material #3.001"]}
      >
        <meshStandardMaterial wireframe={wireframe} map={colorMap} normalMap={normalMap} roughnessMap={roughnessMap} aoMap={aoMap}/>
      </mesh>
      <mesh
        ref={asteroid2}
        castShadow
        receiveShadow
        geometry={nodes.Asteroid_no_10.geometry}
        material={materials["Material #3.001"]}
      >
        <meshStandardMaterial wireframe={wireframe} map={colorMap} normalMap={normalMap} roughnessMap={roughnessMap} aoMap={aoMap}/>
      </mesh>
      <mesh
        ref={asteroid3}
        castShadow
        receiveShadow
        geometry={nodes.Asteroid_no_9.geometry}
        material={materials["Material #3.001"]}
      >
        <meshStandardMaterial wireframe={wireframe} map={colorMap} normalMap={normalMap} roughnessMap={roughnessMap} aoMap={aoMap}/>
      </mesh>
      <mesh
        ref={asteroid4}
        castShadow
        receiveShadow
        geometry={nodes.Asteroid_no_8.geometry}
        material={materials["Material #3.001"]}
      >
        <meshStandardMaterial wireframe={wireframe} map={colorMap} normalMap={normalMap} roughnessMap={roughnessMap} aoMap={aoMap}/>
      </mesh>
      <mesh
        ref={asteroid5}
        castShadow
        receiveShadow
        geometry={nodes.Asteroid_no_7.geometry}
        material={materials["Material #3.001"]}
      >
        <meshStandardMaterial wireframe={wireframe} map={colorMap} normalMap={normalMap} roughnessMap={roughnessMap} aoMap={aoMap}/>
      </mesh>
      <mesh
        ref={asteroid6}
        castShadow
        receiveShadow
        geometry={nodes.Asteroid_no_6.geometry}
        material={materials["Material #3.001"]}
      >
        <meshStandardMaterial wireframe={wireframe} map={colorMap} normalMap={normalMap} roughnessMap={roughnessMap} aoMap={aoMap}/>
      </mesh>
      <mesh
        ref={asteroid7}
        castShadow
        receiveShadow
        geometry={nodes.Asteroid_no_5.geometry}
        material={materials["Material #3.001"]}
      >
        <meshStandardMaterial wireframe={wireframe} map={colorMap} normalMap={normalMap} roughnessMap={roughnessMap} aoMap={aoMap}/>
      </mesh>
      <mesh
        ref={asteroid8}
        castShadow
        receiveShadow
        geometry={nodes.Asteroid_no_4.geometry}
        material={materials["Material #3.001"]}
      >
        <meshStandardMaterial wireframe={wireframe} map={colorMap} normalMap={normalMap} roughnessMap={roughnessMap} aoMap={aoMap}/>
      </mesh>
      <mesh
        ref={asteroid9}
        castShadow
        receiveShadow
        geometry={nodes.Asteroid_no_3.geometry}
        material={materials["Material #3.001"]}
      >
        <meshStandardMaterial wireframe={wireframe} map={colorMap} normalMap={normalMap} roughnessMap={roughnessMap} aoMap={aoMap}/>
      </mesh>
      <mesh
        ref={asteroid10}
        castShadow
        receiveShadow
        geometry={nodes.Asteroid_no_2.geometry}
        material={materials["Material #3.001"]}
      >
        <meshStandardMaterial wireframe={wireframe} map={colorMap} normalMap={normalMap} roughnessMap={roughnessMap} aoMap={aoMap}/>
      </mesh>
    </group>
  );
}

useGLTF.preload("/assets/asteroids/model/asteroids.gltf");

export default AsteroidModel;