// Ensure to add a dark-mode class to the body element or a top-level wrapper element when toggling dark mode

"use client";

import { useParams } from 'next/navigation';
import Image from 'next/image';
import projects from '../data/projectsData'; // Adjusted import path

const ProjectDetailsPage = () => {
  const params = useParams();
  const { id } = params;
  const project = projects.find((p) => p.id === parseInt(id as string));

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="container mx-auto pt-5 text-center max-w-screen-lg px-8">
      <h1 className="fw-light pb-5">{project.title}</h1>
      {project.details.map((detail, index) => (
        <div key={index} className="clearfix mb-5">
          <div className={`float-${index % 2 === 0 ? 'end' : 'start'} mb-3 ms-md-3 detailed-image`}>
            <Image
              src={detail.image}
              alt={`Detail ${index + 1}`}
              width={400}
              height={200}
              className="detailed-image"
            />
          </div>
          <p className="lead text-muted py-2" style={{ textAlign: 'left' }}>{detail.text}</p>
        </div>
      ))}
      <div className="video-container">
        <h4>{project.finalMedia.description}</h4>
        {project.finalMedia.type === 'video' ? (
          <video controls className="video-content">
            <source src={project.finalMedia.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image
            src={project.finalMedia.src}
            alt="Final media"
            className="img-fluid mb-3 px-5 rounded video-content"
            width={800}
            height={400}
            style={{ objectFit: 'contain', width: '100%', height: '100%' }}
          />
        )}
      </div>
      <div className="button-container d-flex justify-content-center pt-2 pb-5">
        <a className="align-items-end mr-5 px-4" href={project.githubLink}>
          <button type="button" className="btn custom-button">See on github ...</button>
        </a>
        <a className="align-items-end mr-5 px-4" href={project.documentationLink}>
          <button type="button" className="btn custom-button">Documentation ...</button>
        </a>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
