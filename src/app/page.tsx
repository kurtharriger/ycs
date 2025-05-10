import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="container-custom text-center relative z-10">
          <div className="mb-8">
            <Image
              src="/logo.svg"
              alt="YourCommunity.Space"
              width={120}
              height={120}
              className="mx-auto h-24 w-auto"
            />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Make Space for What Matters
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A platform built for people, not profit. Where community comes before content, and connection matters more than engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/start-organizing" className="btn-primary">
              Start Organizing
            </Link>
            <Link href="/find-events" className="btn-secondary">
              Find Events
            </Link>
          </div>
          <p className="mt-4 text-gray-600 text-sm">
            Join us in reclaiming the digital commons. Connect with your community organizer or{' '}
            <Link href="/start-organizing" className="text-primary-600 hover:text-primary-800">
              create your own space
            </Link>
            .
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white relative">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Why We&apos;re Different</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-xl bg-gray-50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-xl font-semibold mb-4">People Over Profit</h3>
              <p className="text-gray-600">
                We serve communities, not shareholders. No ads, no engagement metrics, just meaningful connections.
              </p>
            </div>
            <div className="p-8 rounded-xl bg-gray-50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-xl font-semibold mb-4">Open & Accessible</h3>
              <p className="text-gray-600">
                Built for organizers and volunteers. No fees between people and events, no barriers to community.
              </p>
            </div>
            <div className="p-8 rounded-xl bg-gray-50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-xl font-semibold mb-4">Deep Connection</h3>
              <p className="text-gray-600">
                Technology that brings people together, not apart. A space to gather, not perform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Join the Movement</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Create Space', desc: 'Set up your community space and invite others' },
              { step: 2, title: 'Build Together', desc: 'Connect with like-minded organizers and volunteers' },
              { step: 3, title: 'Grow Community', desc: 'Host events that bring people together' },
              { step: 4, title: 'Make Impact', desc: 'Create lasting change in your community' },
            ].map((item) => (
              <div key={item.step} className="text-center group">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                  <span className="text-2xl font-bold text-primary-600">{item.step}</span>
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600 relative overflow-hidden">
        <div className="container-custom text-center relative z-10">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Reclaim Community?</h2>
          <p className="text-xl text-primary-100 mb-8">
            If you&apos;ve felt something human is missing online, if you&apos;ve wanted a place to gather, not perform...
            This is Your Community Space.
          </p>
          <Link href="/start-organizing" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
            Join Us Today
          </Link>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/20 to-transparent"></div>
      </section>
    </div>
  );
}
