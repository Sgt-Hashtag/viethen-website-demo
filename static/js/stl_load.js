import * as THREE from "../js/lib_three/three.module.js"
import { OrbitControls } from "./lib_three/OrbitControls.js"
import { STLLoader } from "./lib_three/STLLoader.js"
import Stats from "./lib_three/stats.module.js"
const scene = new THREE.Scene()
scene.background = new THREE.Color( 0xa0a0a0 );

const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

const dirLight = new THREE.DirectionalLight( 0xffffff, 3 );
dirLight.position.set(- 3, 10, - 10);
dirLight.castShadow = true;
dirLight.shadow.camera.top = 2;
dirLight.shadow.camera.bottom = - 2;
dirLight.shadow.camera.left = - 2;
dirLight.shadow.camera.right = 2;
dirLight.shadow.camera.near = 0.1;
dirLight.shadow.camera.far = 40;
scene.add( dirLight );


const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x8d8d8d, 3 );
hemiLight.position.set( 0, 20, 0 );
scene.add( hemiLight );

// const light = new THREE.DirectionalLight()
// light.position.set(2.5, 7.5, 15)
// scene.add(light)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 3

const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#model'), antialias:true })

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

const material = new THREE.MeshPhysicalMaterial({
    color: 0xb2ffc8,
    metalness: 0.25,
    roughness: 0.1,
    opacity: 1.0,
    transparent: true,
    transmission: 0.99,
    clearcoat: 1.0,
    clearcoatRoughness: 0.25
})

const loader = new STLLoader()
loader.load(
    '/static/img/SCARA.stl',
    function (geometry) {
        const mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const stats = new Stats()
document.body.appendChild(stats.dom)

function animate() {
    requestAnimationFrame(animate)

    controls.update()

    render()

    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()