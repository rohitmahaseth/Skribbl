import React from 'react';
import Can from '../Can';
import { connect } from "react-redux";
import Modal from 'react-modal';
import { useState } from 'react';
import io from 'socket.io-client'

const socket = io.connect('https://kribbl.herokuapp.com/', { transports: ['websocket', 'polling', 'flashsocket'] })

function Play(props) {
    const [guess, setGuess] = useState('');
    const [guees, setGuees] = useState([]);
    const [abcc, setAbcc] = useState([]);
    const [randWord, setRandWord] = useState('');
    const [randsWord, setRandsWord] = useState('');
    const [modalisopen, setmodalisopen] = useState(false);
    const [winmodal, setwinmodal] = useState(false);

    const words = ['aircraft', 'carrier', 'airplane', 'alarm', 'clock', 'ambulance', 'angel', 'animal', 'ant', 'animal', 'migration', 'anvil', 'apple',
        'arm', 'asparagus', 'axe', 'backpack', 'banana', 'bandage', 'barn', 'baseball', 'baseball', 'bat', 'basket', 'basketball', 'bat', 'bathtub',
        'beach', 'beard', 'bed', 'bee', 'belt', 'bench', ' bicycle', 'binoculars', 'bird', 'birthday', 'cake', 'blackberry', 'blueberry', ' book',
        'boomerang', 'bottlecap', 'bowtie', 'bracelet', ' brain', ' bread', 'bridge', 'broccoli', 'broom', 'bucket', 'bulldozer', ' bus', 'bush',
        'butterfly', 'cactus', 'cake', 'calculator', 'calendar', 'camel', 'camera', 'camouflage', 'campfire', 'candle', 'cannon', 'canoe', 'car',
        'carrot', 'castle', 'cat', 'ceiling', 'fan', 'cello', 'cell phone', 'chair', 'chandelier', 'church', 'circle', 'flute', 'clock',
        'cloud', 'coffee cup', 'compass', 'computer', 'cookie', 'cooler', 'couch', 'cow', 'crab', 'crayon', 'crocodile', 'crown', 'cruise ship',
        'cup', 'diamond', 'dishwasher', 'diving board', 'dog', 'dolphin', 'donut', 'door', 'dragon', 'dresser', 'drill', 'drums', 'duck',
        'dumbbell', 'ear', 'elbow', 'elephant', 'envelope', 'eraser', 'eye', 'eyeglasses', 'face', 'fan', 'feather', ' fence', 'finger', ' fire',
        'hydrant', 'fireplace', 'firetruck', 'fish', 'flamingo', 'flashlight', 'flip', 'flips', 'floor', 'lamp', 'flower', 'flying', 'foot',
        'fork', 'frog', 'frying pan', 'garden', 'garden hose', 'giraffe', 'goatee', 'golf club', 'grapes', 'grass', 'guitar', 'hamburger',
        'hammer', 'hand', 'harp', 'hat', 'headphones', 'hedgehog', 'helicopter', 'helmet', 'hexagon', 'hockey', 'hockey stick', 'horse',
        'hospital', 'hot air', 'balloon', 'hot dog', 'hot tub', 'hourglass', 'house', 'house plant', 'hurricane', 'ice cream', 'jacket', 'jail',
        'kangaroo', 'key', 'keyboard', 'knee', 'knife', 'ladder', 'lantern', 'laptop', 'leaf', 'leg', 'light bulb', 'lighter', 'lighthouse',
        'lightning', 'line', 'lion', 'lipstick', 'lobster', 'lollipop', 'mailbox', 'map', 'marker', 'matches', 'megaphone', 'mermaid',
        'microphone', 'microwave', 'monkey', 'moon', 'mosquito', 'motorbike', 'mountain', 'mouse', 'moustache', 'mouth', 'mug', 'mushroom',
        'nail', 'necklace', 'nose', 'ocean', 'octagon', 'octopus', 'onion', 'oven', 'owl', 'paintbrush', 'paint can', 'palm tree', 'panda',
        'pants', 'paper clip', 'parachute', 'parrot', 'passport', 'peanut', 'pear', 'peas', 'pencil', 'penguin', 'piano', 'pickup truck',
        'picture frame', 'pig', 'pillow', 'pineapple', 'pizza', 'pliers', 'police car', 'pond', 'pool', 'popsicle', 'postcard', 'potato',
        'power outlet', 'purse', 'rabbit', 'raccoon', 'radio', 'rain', 'rainbow', 'rake', 'remote control', 'rhinoceros', 'rifle', 'river',
        'roller coaster', 'rollerskates', 'sailboat', 'sandwich', 'saw', 'saxophone', 'school bus', 'scissors', 'scorpion', 'screwdriver',
        'sea turtle', 'see saw', 'shark', 'sheep', 'shoe', 'shorts', 'short monster', 'shovel', 'sink', 'skateboard', 'skull', 'skyscraper',
        'sleeping bag', 'smiley face', 'snail', 'snake', 'snorkel', 'snowflake', 'snowman', 'soccer ball', 'sock', 'speedboat',
        'spider', 'spoon', 'spreadsheet', 'square', 'squiggle', 'squirrel', 'stairs', 'star', 'steak', 'stereo', 'stethoscope', 'stitches',
        'stop sign', 'stove', 'strawberry', 'street light', 'bean', 'submarine', 'suitcase', 'sun', 'swan', 'sweater', 'swing set', 'sword',
        'syringe', 'table', 'teapot', 'teddy-bear', 'telephone', 'television', 'tennis racket', 'tent', 'eiffel tower', 'great wall of china',
        'tiger', 'toaster', 'toe', 'toilet', 'tooth', 'toothbrush', 'toothpaste', 'tornado', 'tractor', 'traffic light', 'train', 'tree',
        'triangle', 'trombone', 'truck', 'trumpet', 't-shirt', 'umbrella', 'underwear', 'van', 'vase', 'violin', 'washing machine',
        'watermelon', 'waterslide', 'whale', 'wheel', 'windmill', 'wine bottle', 'wine glass', 'wristwatch', 'yoga', 'zebra', 'zigzag'];

    const won = () => {
        setwinmodal(true)
    }
    const close = () => {
        setwinmodal(false)
    }
    const setmodalisopentotrue = () => {
        setmodalisopen(true)
        let i = Math.floor(Math.random() * words.length)
        setRandWord(words[i])
        socket.emit('word', randWord)
        socket.on('word', (randWord) => {
            setRandsWord(randWord)
        })
    }

    const setmodalisopentofalse = () => {
        setmodalisopen(false)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            socket.emit('chat', (guess))
        }
    }
    const chat = () => {
        socket.on('chat', (msg) => {
            console.log(msg)
            setGuees(guees => [...guees, msg])
            console.log(guees)
        })
    }

    const abc = props.user
    const handle = () => {
        socket.emit('user', (abc))
        socket.on('user', (lol) => {
            setAbcc(abcc => [...lol])
        })
    }
    return (
        <>
            <div onLoad={chat}>
                <div onLoad={handle} className='deeev1'>
                    <h3 className='heading1'><span style={{ color: 'red' }}>K</span>
                        <span style={{ color: 'orange' }}>r</span><span style={{ color: 'yellow' }}>i</span>
                        <span style={{ color: '	#00FF00' }}>b</span><span style={{ color: '#00bfff' }}>b</span>
                        <span style={{ color: 'blue' }}>l</span><span style={{ color: '#FF1493' }}>e</span>
                        <span style={{ color: 'purple' }}>.</span><span style={{ color: 'white', fontSize: '4rem' }}>io</span></h3>
                    <img src='https://clipart.world/wp-content/uploads/2020/08/cartoon-pencil-png-transparent.png' alt="" style={{ marginLeft: '0px', marginTop: '0px', marginBottom: '0px', marginRight: '70rem', height: '7rem' }} />
                </div>
                <center>
                    <nav className="navbar bg-light" style={{ display: 'block', width: '92rem', height: '4rem', marginTop: '1rem', alignContent: 'normal' }}>
                        <span className="navbar-text">
                            <h3 style={{ textAlign: 'left', display: 'flex' }}><div style={{ marginTop: '7px' }}>
                                <div>
                                    <button onClick={setmodalisopentotrue} style={{ marginLeft: '1.5rem' }}>Get a Word</button>
                                    <Modal className='modalbaby' isOpen={modalisopen}>
                                        <button className='xbaby' onClick={setmodalisopentofalse}>❌</button>
                                        <center><h1 style={{ fontSize: '7rem', marginTop: '10rem' }}> Draw : {randsWord} </h1></center>
                                    </Modal>
                                </div>
                            </div>
                                <div style={{ marginLeft: '30px' }} ><img className="image2baby" src='https://upload.wikimedia.org/wikipedia/commons/7/7a/Alarm_Clock_GIF_Animation_High_Res.gif' alt="" /></div><div style={{ marginLeft: '50rem', marginTop: '7px' }}>Number of Letters : {randsWord.length}</div></h3>
                        </span>
                        <Can />
                    </nav>
                </center>
                <nav className="navbar bg-light" style={{ position: 'absolute', display: 'inline-block', width: '17rem', height: '30rem', marginTop: '0.6rem', marginLeft: '1.5rem', marginBottom: '40rem' }}>
                    <div className="navbar-text" style={{ overflowY: 'scroll', maxHeight: '29rem' }}>
                        <h1 style={{ marginLeft: '12px', fontSize: '1.7rem', color: 'blue' }}>{abcc.map((val) => (
                            <p>{val['username']}</p>
                        ))}</h1>
                    </div>
                </nav>
                <input style={{ marginTop: '0.6rem', marginRight: '2rem', width: '17rem' }} className='inpbaby' type='text' onKeyDown={handleKeyDown} value={guess} onChange={(e) => setGuess(e.target.value)} placeholder="Guess here..." />
                <nav className='overlay navbar bg-light' style={{ position: 'absolute', display: 'inline-block', width: '16.9rem', height: '30rem', marginTop: '3.5rem', marginLeft: '76.6rem' }}>
                    <div className="navbar-text" style={{ overflowY: 'scroll', maxHeight: '29rem' }}>
                        <ul>
                            {
                                guees.map((val) => (
                                    val.guess === randsWord ?
                                        <Modal className='modalbaby' isOpen={won}>
                                            <button className='xbaby' onClick={close}>❌</button>
                                            <center><h1 style={{ fontSize: '5rem', marginTop: '10rem' }}> {val.k} GUESSED IT RIGHT: {val.guess} <br/>
                                            Reload to Play Again </h1></center>
                                        </Modal>
                                        : <li style={{ color: 'red', fontSize: '1.2rem' }}> {val.k}: {val.guess}</li>
                                ))
                            }
                        </ul>
                    </div>
                </nav>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.bats
    }
}

export default connect(mapStateToProps)(Play)
