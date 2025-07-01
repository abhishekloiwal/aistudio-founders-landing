import { useState } from "react";
import { FadeInBlur } from "@/components/ui/fade-in-blur";

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    building: "",
    background: "",
    contact: "",
    link: "",
    cv: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, cv: e.target.files[0] });
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center">
        <FadeInBlur duration={0.8}>
          <p className="text-gray-300 text-lg font-light tracking-wide text-center">
            If we're a fit, you'll hear within 72 hours.
          </p>
        </FadeInBlur>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <FadeInBlur duration={0.8}>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* What are you building? */}
          <div>
            <label className="block text-gray-300 text-sm font-light mb-2">
              What are you building?
            </label>
            <input
              type="text"
              name="building"
              value={formData.building}
              onChange={handleChange}
              required
              className="w-full bg-transparent border border-gray-800 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-gray-600 transition-colors duration-300"
            />
          </div>

          {/* Background */}
          <div>
            <label className="block text-gray-300 text-sm font-light mb-2">
              Your background in 50 words - highlight something impressive you have done
            </label>
            <textarea
              name="background"
              value={formData.background}
              onChange={handleChange}
              required
              rows={3}
              className="w-full bg-transparent border border-gray-800 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-gray-600 transition-colors duration-300 resize-none"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="block text-gray-300 text-sm font-light mb-2">
              How should we reach you? (email/number etc)
            </label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              className="w-full bg-transparent border border-gray-800 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-gray-600 transition-colors duration-300"
            />
          </div>

          {/* Link (optional) */}
          <div>
            <label className="block text-gray-300 text-sm font-light mb-2">
              Link (optional)
            </label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="w-full bg-transparent border border-gray-800 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-gray-600 transition-colors duration-300"
            />
          </div>

          {/* CV Upload (optional) */}
          <div>
            <label className="block text-gray-300 text-sm font-light mb-2">
              CV Upload (optional)
            </label>
            <input
              type="file"
              name="cv"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              className="w-full text-gray-400 text-sm file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:font-light file:bg-gray-800 file:text-gray-300 hover:file:bg-gray-700 file:transition-colors file:duration-300"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-gray-700 hover:bg-gray-600 text-white rounded-md px-8 py-2 text-sm font-light tracking-wider transition-colors duration-300 mt-8"
          >
            Submit
          </button>
        </form>
      </FadeInBlur>
    </div>
  );
} 