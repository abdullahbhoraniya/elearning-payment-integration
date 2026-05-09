import axios from "axios";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";


const courses = [
  {
    id: 1,
    title: "Node.js Mastery",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    description:
      "Learn backend development using Node.js, Express and APIs.",
  },
  {
    id: 2,
    title: "React Bootcamp",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop",
    description:
      "Build modern frontend applications using React and Tailwind.",
  },
  {
    id: 3,
    title: "System Design Basics",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    description:
      "Understand scalable architecture and backend system design.",
  },
];

function App() {
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.async = true;

    document.body.appendChild(script);
  }, []);

  const handlePayment = async (course) => {
    try {
      setLoadingId(course.id);

      // CREATE ORDER
      const response = await axios.post(
        "http://localhost:5000/api/v1/payments/create-payment",
        {
          courseId: course.id,
          amount: course.price,
        }
      );

      const data = response.data;

      console.log("ORDER RESPONSE", data);

      // OPEN RAZORPAY MODAL
      const razorpay = new window.Razorpay({
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: data.amount,

        currency: data.currency,

        order_id: data.orderId,

        name: "Code Academy",

        description: course.title,

        image:
          "https://cdn-icons-png.flaticon.com/512/5968/5968381.png",

        prefill: {
          name: "Abdullah",
          email: "abdullah@gmail.com",
          contact: "9999999999",
        },

        theme: {
          color: "#2563eb",
        },

        handler: async function (response) {
          try {
            console.log("PAYMENT SUCCESS", response);

            const verificationResponse = await axios.post(
              "http://localhost:5000/api/v1/payments/verify-payment",
              {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }
            );

            console.log(
              "VERIFICATION SUCCESS",
              verificationResponse.data
            );

            if (verificationResponse.data.success) {
              // LEFT SIDE CONFETTI
              confetti({
                particleCount: 120,
                spread: 90,
                origin: { x: 0.1, y: 0.6 },
              });

              // RIGHT SIDE CONFETTI
              confetti({
                particleCount: 120,
                spread: 90,
                origin: { x: 0.9, y: 0.6 },
              });

              // CENTER BURST
              confetti({
                particleCount: 180,
                spread: 140,
                origin: { y: 0.5 },
              });

            } else {
              alert("Payment Verification Failed");
            }
          } catch (error) {
            console.log(error);

            alert("Verification Error");
          }
        },

        modal: {
          ondismiss: function () {
            console.log("Payment popup closed");
          },
        },
      });

      razorpay.open();

    } catch (error) {
      console.log(error);

      alert("Something went wrong");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden">

      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[120px] rounded-full"></div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#020617]/70 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-2xl font-bold shadow-lg shadow-blue-500/30">
              C
            </div>

            <div>
              <h1 className="text-2xl font-extrabold">
                Code Academy
              </h1>

              <p className="text-xs text-gray-400">
                Learn • Build • Scale
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-gray-300 font-medium">
            <a href="#" className="hover:text-white transition">
              Courses
            </a>

            <a href="#" className="hover:text-white transition">
              Mentors
            </a>

            <a href="#" className="hover:text-white transition">
              Reviews
            </a>

            <a href="#" className="hover:text-white transition">
              Community
            </a>
          </div>

          <button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-105 transition duration-300 px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-500/30">
            Dashboard
          </button>

        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 py-28 grid lg:grid-cols-2 gap-20 items-center">

        {/* Left */}
        <div>

          <div className="inline-flex items-center gap-3 bg-white/10 border border-white/10 px-5 py-3 rounded-full backdrop-blur-xl mb-8">
            <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>

            <span className="text-sm text-gray-300">
              Trusted by 10,000+ developers
            </span>
          </div>

          <h1 className="text-6xl lg:text-7xl font-black leading-tight">

            Master
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}Modern{" "}
            </span>

            Development Skills

          </h1>

          <p className="text-gray-400 text-xl leading-9 mt-10 max-w-2xl">
            Learn backend engineering, React, AI integrations,
            payment systems and scalable architecture through
            real-world industry projects.
          </p>

          <div className="flex flex-wrap gap-5 mt-12">

            <button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-105 transition duration-300 px-8 py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-blue-500/30">
              Start Learning
            </button>

            <button className="border border-white/10 bg-white/5 hover:bg-white/10 transition px-8 py-5 rounded-2xl font-bold text-lg backdrop-blur-xl">
              Watch Preview
            </button>

          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-20">

            <div>
              <h2 className="text-5xl font-black text-blue-400">
                10K+
              </h2>

              <p className="text-gray-500 mt-3">
                Active Students
              </p>
            </div>

            <div>
              <h2 className="text-5xl font-black text-cyan-400">
                50+
              </h2>

              <p className="text-gray-500 mt-3">
                Premium Courses
              </p>
            </div>

            <div>
              <h2 className="text-5xl font-black text-green-400">
                95%
              </h2>

              <p className="text-gray-500 mt-3">
                Success Rate
              </p>
            </div>

          </div>

        </div>

        {/* Right Hero Card */}
        <div className="relative">

          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 blur-3xl opacity-30 rounded-[40px]"></div>

          <div className="relative bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[40px] p-10 shadow-2xl">

            <div className="flex items-center justify-between mb-10">

              <div>
                <p className="text-gray-400">
                  Featured Course
                </p>

                <h2 className="text-4xl font-black mt-2">
                  AI SaaS Engineering
                </h2>
              </div>

              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold px-5 py-2 rounded-full">
                Bestseller
              </div>

            </div>

            <div className="space-y-5">

              <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center justify-between">
                <span>✔ Backend Architecture</span>
                <span className="text-blue-400">12 Modules</span>
              </div>

              <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center justify-between">
                <span>✔ Payment Integration</span>
                <span className="text-cyan-400">Live Project</span>
              </div>

              <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center justify-between">
                <span>✔ AI Integrations</span>
                <span className="text-green-400">Advanced</span>
              </div>

            </div>

            <button className="w-full mt-10 bg-gradient-to-r from-blue-600 to-cyan-500 py-5 rounded-2xl text-xl font-black hover:scale-[1.02] transition duration-300 shadow-xl shadow-blue-500/20">
              Enroll Now — ₹999
            </button>

          </div>

        </div>

      </section>

      {/* Courses Section */}
      <section className="max-w-7xl mx-auto px-6 pb-28">

        <div className="text-center mb-20">

          <div className="inline-block bg-white/5 border border-white/10 px-6 py-3 rounded-full mb-8 backdrop-blur-xl">
            <span className="text-blue-400 font-semibold">
              Premium Courses
            </span>
          </div>

          <h2 className="text-6xl font-black">
            Explore Top Courses
          </h2>

          <p className="text-gray-400 text-xl mt-8 max-w-3xl mx-auto leading-9">
            Learn practical development skills with modern
            industry-level projects and mentorship.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

          {courses.map((course) => (
            <div
              key={course.id}
              className="group relative bg-white/5 border border-white/10 rounded-[35px] overflow-hidden backdrop-blur-xl hover:border-blue-500/50 transition duration-500 hover:-translate-y-3 shadow-2xl"
            >

              {/* Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-b from-blue-500/10 to-cyan-500/10"></div>

              <div className="relative overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute top-5 left-5 bg-black/50 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10">
                  <span className="text-sm font-semibold">
                    Premium Course
                  </span>
                </div>
              </div>

              <div className="p-8 relative z-10">

                <div className="flex items-center justify-between mb-6">

                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400 text-lg">
                      ★★★★★
                    </span>

                    <span className="text-gray-400 text-sm">
                      (4.9)
                    </span>
                  </div>

                  <span className="bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold">
                    Bestseller
                  </span>

                </div>

                <h3 className="text-3xl font-black mb-5 leading-tight">
                  {course.title}
                </h3>

                <p className="text-gray-400 leading-8 mb-8">
                  {course.description}
                </p>

                <div className="flex items-center justify-between mb-8">

                  <div>
                    <p className="text-gray-500 text-sm">
                      Course Price
                    </p>

                    <h2 className="text-5xl font-black text-blue-400 mt-2">
                      ₹{course.price}
                    </h2>
                  </div>

                  <div className="text-right">
                    <p className="text-gray-500 text-sm">
                      Duration
                    </p>

                    <h3 className="text-xl font-bold mt-2">
                      12 Weeks
                    </h3>
                  </div>

                </div>

                <button
                  onClick={() => handlePayment(course)}
                  disabled={loadingId === course.id}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-[1.02] transition duration-300 py-5 rounded-2xl text-lg font-black shadow-lg shadow-blue-500/20 disabled:opacity-50"
                >
                  {loadingId === course.id
                    ? "Processing..."
                    : "Enroll Now"}
                </button>

              </div>

            </div>
          ))}

        </div>

      </section>

    </div>
  );
}

export default App;