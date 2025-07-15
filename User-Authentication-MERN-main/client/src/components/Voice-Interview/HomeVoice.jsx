'use client';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import InterviewCard from '@/components/InterviewCard';

// Replace with real API call
// const getLatestInterviews = async () => {
//   return [
//     {
//       id: '1',
//       role: 'Frontend Developer',
//       type: 'Technical',
//       techstack: ['React', 'TypeScript'],
//       createdAt: new Date().toISOString(),
//     },
//     {
//       id: '2',
//       role: 'Backend Developer',
//       type: 'Behavioral',
//       techstack: ['Node.js', 'MongoDB'],
//       createdAt: new Date().toISOString(),
//     },
//   ];
// };

function HomeVoice() {
  // const [interviews, setInterviews] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await getLatestInterviews();
  //       setInterviews(data);
  //     } catch (error) {
  //       console.error('Failed to fetch interviews:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // if (loading) return <p>Loading interviews...</p>;

  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
          <p className="text-lg">
            Practice real interview questions & get instant feedback
          </p>

          <Link href="/interview">
            <a className="btn-primary max-sm:w-full bg-blue-600 text-white px-4 py-2 rounded-md text-center">
              Start an Interview
            </a>
          </Link>
        </div>

        {/* <Image
          src="/robot.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        /> */}
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Available Interviews</h2>
        <div className="interviews-section">
          {/* {interviews.length > 0 ? (
            interviews.map((interview) => (
              <InterviewCard
                key={interview.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>No interviews available</p>
          )} */}
          <p>You have not any interview yet</p>
        </div>
      </section>
    </>
  );
}

export default HomeVoice;
