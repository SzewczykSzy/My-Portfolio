"use client";

import React from 'react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Kom {
  date: string;
  distance: number;
  elevation: number;
  id: number;
  name: string;
  time: string;
  type: string;
}

interface LastActivity {
  achievements: number;
  avg_speed: number;
  distance: number;
  elevation: number;
  id: number;
  mov_time: string;
  name: string;
  time: string;
  time_from_act: number;
  type: string;
}

const About = () => {
  const [koms, setKoms] = useState<Kom[]>([]);
  const [lastActivity, setLastActivity] = useState<LastActivity | null>(null);

  useEffect(() => {
    // Fetch KOM data from the Strava KOMs API endpoint
    fetch('https://my-portfolio-backend-flask.vercel.app/api/strava_koms')
      .then((response) => response.json())
      .then((data) => setKoms(data))
      .catch((error) => console.error('Error fetching Strava KOMs:', error));
  }, []);

  useEffect(() => {
    // Fetch Last Activity data from the Strava API endpoint
    fetch('https://my-portfolio-backend-flask.vercel.app/api/strava_last_activity')
      .then((response) => response.json())
      .then((data) => setLastActivity(data))
      .catch((error) => console.error('Error fetching last activity:', error));
  }, []);

  return (
    <div className="container mx-auto p-8">
      {/* Welcome Statement */}
      <div className="text-center mb-12">
        <div className="inline-block">
          <Image 
            src='/profile-picture.jpg' 
            alt="Profile Picture" 
            width={100} 
            height={100} 
            className="rounded-full border-4 border-gray-300 shadow-md mb-4" 
          />
        </div>
        <h1 className="text-4xl font-extrabold">
          Welcome to My Story! 😊
        </h1>
        <p className="text-xl mt-2">
          Grab a coffee ☕ and let me tell you a bit about myself.
        </p>
      </div>

      {/* About Me Section */}
      <section className="p-6 rounded-lg shadow-md mb-12 bg-white dark:bg-gray-800">
        <h2 className="text-3xl font-bold mb-4">
          <span role="img" aria-label="emoji">👨‍🎓</span> About Me
        </h2>
        <p className="text-lg mb-4">
          Hi! My name is Szymon, and I&apos;m a 5th-year student at the AGH University of Science and Technology in Krakow 🐉, where I&apos;m pursuing a degree in Automation and Robotics 🤖 
          with a specialization in Computer Science in Control and Management 👨‍💻. Hailing from a small village 🏡 in the southeastern region of Poland, my academic journey has been 
          a blend of curiosity 🧐, ambition, and a love ❤️ for technology.
        </p>
        <p className="text-lg mb-4">
          My interest in automation and robotics 🦾 was sparked during high school 🏫, where I decided that this field would be an exciting path to explore. While I initially dived 
          into subjects like Control Theory 🕹️, Industrial Automation 🏭, and Robotics, it wasn&apos;t long before I discovered a deeper passion for programming 💻. The idea of creating solutions 
          that optimize processes 📈 and automate tasks fascinated me, leading me to delve into Python 🐍 programming, machine learning, data science 🤖🧠🇦🇮👾, and operational research.
        </p>
        <p className="text-lg mb-4">
          Outside the classroom, I have practical experience as a math tutor 🔢, where for the past two years, I&apos;ve helped students prepare for their exams of maturity 🎓📜. I thrive 
          on turning chaos into order 📶, whether it&apos;s solving a tough problem, organizing data 🗂️, or finding a new way to approach a challenge. My academic journey has been one of 
          continuous 🔁 learning, driven by an insatiable curiosity and a desire to overcome challenges.
        </p>
        <p className="text-lg mb-4">
          When I&apos;m not 🚫 immersed in my studies 📚, I enjoy a range of activities that keep me active and engaged. Rollerblading, cycling 🚲, and running 🏃 are my go-to ways to unwind and 
          stay fit. I also enjoy playing table tennis 🏓, dabbling in computer games 🎮, and participating in various team sports ⚽. These hobbies provide a balance to my academic life, 
          offering both relaxation and excitement.
        </p>
      </section>

      {/* Hobbies Section */}
      <section className="text-center p-6 rounded-lg shadow-md bg-white dark:bg-gray-800">
        <h2 className="text-3xl font-bold mb-8">
          <span role="img" aria-label="emoji">🎨</span> Hobbies
        </h2>
        
        {/* Hobby 1: Rollerblading */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-2">Rollerblading 🛼</h3>
          <p className="text-lg">
            I first strapped on a pair of inline skates when I was about 10 years old, quickly falling in love with the freedom and thrill of gliding around my neighborhood. For two years, 
            rollerblading was a big part of my life, until other interests took over, and the skates were put away. Fast forward to 2021, and I decided to give rollerblading another shot. 
            This time, it clicked more than ever before, reigniting my passion for the sport.
          </p>
          <p className="text-lg mt-6">
            These days, I&apos;m all about covering big distances on my skates. There&apos;s something incredibly satisfying about the rhythmic motion, the speed, and the sense of adventure that comes 
            with long-distance skating. My longest trip so far? An exhilarating 106 kilometers. Rollerblading has become more than just a hobby for me; it&apos;s a way to push my limits, explore 
            new places, and experience the world from a different perspective.
          </p>
          <div className="container mx-auto p-8">
            <div className="text-center mb-6">
              <h1 className="text-4xl font-extrabold">My Strava Stats</h1>
            </div>
            <section className="text-center p-6 rounded-lg shadow-md bg-white dark:bg-gray-800">
              {/* Last Activity Table */}
              {lastActivity ? (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-6">Last Activity: {lastActivity.time_from_act}h ago</h2>
                  <table className="min-w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600">
                    <thead className="bg-gray-100 dark:bg-gray-800">
                      <tr>
                        <th className="px-6 py-3 border-b dark:border-gray-600">Name</th>
                        <th className="px-6 py-3 border-b dark:border-gray-600">Type</th>
                        <th className="px-6 py-3 border-b dark:border-gray-600">Distance</th>
                        <th className="px-6 py-3 border-b dark:border-gray-600">Elevation Gain</th>
                        <th className="px-6 py-3 border-b dark:border-gray-600">Average Speed</th>
                        <th className="px-6 py-3 border-b dark:border-gray-600">Moving Time</th>
                        <th className="px-6 py-3 border-b dark:border-gray-600">Achievements</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-100 dark:hover:bg-gray-800">
                        <td className="px-6 py-4 text-blue-500 dark:text-blue-300">
                          <a href={`https://www.strava.com/activities/${lastActivity.id}`} target="_blank" rel="noopener noreferrer">
                            {lastActivity.name}
                          </a>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">{lastActivity.type}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">{lastActivity.distance} km</td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">{lastActivity.elevation} m</td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">{lastActivity.avg_speed} km/h</td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">{lastActivity.mov_time}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">{lastActivity.achievements}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>Loading last activity...</p>
              )}

              {/* KOMs Table */}
              <h2 className="text-2xl font-bold mb-6">My KOMs</h2>
              {koms.length > 0 ? (
                <table className="min-w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600">
                  <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 border-b dark:border-gray-600"></th>
                      <th className="px-6 py-3 border-b dark:border-gray-600">Name</th>
                      <th className="px-6 py-3 border-b dark:border-gray-600">Date</th>
                      <th className="px-6 py-3 border-b dark:border-gray-600">Distance</th>
                      <th className="px-6 py-3 border-b dark:border-gray-600">Elevation Gain</th>
                      <th className="px-6 py-3 border-b dark:border-gray-600">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {koms.map((kom) => (
                      <tr key={kom.id} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                        <td className="px-6 py-4 text-yellow-500 text-xl">👑</td>
                        <td className="px-6 py-4 text-blue-500 dark:text-blue-300">
                          <a href={`https://www.strava.com/activities/${kom.id}`} target="_blank" rel="noopener noreferrer">
                            {kom.name}
                          </a>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">{kom.date}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">{kom.distance} km</td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">{kom.elevation} m</td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">{kom.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No KOMs found.</p>
              )}
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
