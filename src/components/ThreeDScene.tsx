/* eslint-disable react/no-unknown-property */
import { Suspense, type FC } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import styles from './ThreeDScene.module.css';

const ThreeDScene: FC = () => (
  <div className={styles.canvasContainer} aria-hidden="true">
    <Canvas camera={{ position: [4, 4, 4], fov: 50 }} shadows>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <Suspense fallback={null}>
        <mesh rotation={[0.4, 0.6, 0]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="#7c8cff" metalness={0.2} roughness={0.35} />
        </mesh>
      </Suspense>
      <OrbitControls enablePan={false} />
    </Canvas>
  </div>
);

export default ThreeDScene;
