import { Metadata, ResolvingMetadata } from "next";
import dynamic from 'next/dynamic';

// Simulated database fetch
async function getJob(id: string) {
  return {
    id,
    title: `${id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Role`,
    description: `Details about the ${id} position. Join Smart Seekers to advance your career.`,
  };
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = (await params).id;

  // fetch data
  const job = await getJob(id);

  return {
    title: job.title,
    description: job.description,
    openGraph: {
      title: job.title,
      description: job.description,
      url: `https://sit.seekersplus.ai/jobs/${id}`,
    },
  };
}

// Dynamic import for a heavy component
const ApplyButton = dynamic(() => import('./ApplyButton'), {
  loading: () => <p className="text-gray-500">Loading apply button...</p>,
});

export default async function JobPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const job = await getJob(id);

  // Generate structured data for the job posting
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description,
    "identifier": {
      "@type": "PropertyValue",
      "name": "Smart Seekers",
      "value": id
    },
    "datePosted": new Date().toISOString(),
    "validThrough": new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Smart Seekers",
      "sameAs": "https://sit.seekersplus.ai",
      "logo": "https://sit.seekersplus.ai/logo.svg"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Remote",
        "addressCountry": "US"
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-8 md:p-24 bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Header with Navigation */}
      <header className="mb-12">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
            <li><a href="/" className="hover:text-gray-900">Home</a></li>
            <li><span className="mx-2">/</span></li>
            <li><a href="/jobs" className="hover:text-gray-900">Jobs</a></li>
            <li><span className="mx-2">/</span></li>
            <li className="text-gray-900 font-medium" aria-current="page">{job.title}</li>
          </ol>
        </nav>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{job.title}</h1>
      </header>
      
      <main className="flex-1 max-w-4xl w-full mx-auto bg-white p-8 rounded-xl shadow-sm">
        <article>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Job Description</h2>
            <p className="text-gray-600 leading-relaxed">{job.description}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Requirements</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Strong communication skills</li>
              <li>Relevant industry experience</li>
              <li>Passion for innovation</li>
            </ul>
          </section>

          <aside className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Ready to apply?</h3>
              <p className="text-sm text-gray-500">Take the next step in your career.</p>
            </div>
            <ApplyButton />
          </aside>
        </article>
      </main>

      <footer className="mt-16 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Smart Seekers. All rights reserved.</p>
      </footer>
    </div>
  );
}
