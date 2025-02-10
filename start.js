import fetch from 'node-fetch';
import dotenv from 'dotenv';
import pkg from 'sound-play';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const { play } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const soundFile = join(__dirname, './stewie-crying-101soundboards.mp3');

async function playSound() {
  try {
    await play(soundFile);
  } catch (err) {
    console.error('Errore durante la riproduzione del suono:', err);
  }
}

let lastUpdateTime = null;

async function checkUpdates() {
  try {
    const response = await fetch(`https://api.bitbucket.org/2.0/repositories/${process.env.WORKSPACE}/${process.env.REPOSITORY}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.BITBUCKET_TOKEN}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (lastUpdateTime === null) {
      lastUpdateTime = data.updated_on;
      console.log('Primo controllo. Ultimo aggiornamento:', new Date(lastUpdateTime));
    }
    else if (data.updated_on !== lastUpdateTime) {
      console.log('Repository aggiornato!');
      console.log('Vecchio timestamp:', new Date(lastUpdateTime));
      console.log('Nuovo timestamp:', new Date(data.updated_on));
      
      await playSound();
      
      lastUpdateTime = data.updated_on;
    }

  } catch (err) {
    console.error('Si è verificato un errore:', err.message);
    if (err.response) {
      console.error('Response status:', err.response.status);
      console.error('Response headers:', err.response.headers);
    }
  }
}

playSound();

checkUpdates();

setInterval(checkUpdates, 10000);

console.log('Monitoraggio avviato. In attesa di aggiornamenti...');