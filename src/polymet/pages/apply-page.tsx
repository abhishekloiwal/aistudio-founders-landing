import { useState } from "react";
import { FadeInBlur } from "@/components/ui/fade-in-blur";
import { supabase, type Application } from "@/lib/supabase";

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    building: "",
    background: "",
    contact: "",
    link: "",
    cv: null as File | null,
  });

  // Email validation helper
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Extract email from contact field
  const extractEmail = (contact: string) => {
    const emailMatch = contact.match(/\b[^\s@]+@[^\s@]+\.[^\s@]+\b/);
    return emailMatch ? emailMatch[0] : null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Extract email from contact field for duplicate checking
      const email = extractEmail(formData.contact);
      
      if (!email) {
        setError("Please include a valid email address in your contact information.");
        setLoading(false);
        return;
      }

      // Check for duplicate email
      const { data: existingApplication } = await supabase
        .from('applications')
        .select('id')
        .eq('email', email)
        .single();

      if (existingApplication) {
        setError("An application with this email address has already been submitted.");
        setLoading(false);
        return;
      }

      // Upload CV file to storage if present
      let cvUrl = null;
      if (formData.cv) {
        const fileExt = formData.cv.name.split('.').pop();
        const fileName = `${email}-${Date.now()}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('application-cvs')
          .upload(fileName, formData.cv);

        if (uploadError) {
          console.error('File upload error:', uploadError);
          setError("Failed to upload CV. Please try again.");
          setLoading(false);
          return;
        }

        // Get the public URL for the uploaded file
        const { data: urlData } = supabase.storage
          .from('application-cvs')
          .getPublicUrl(fileName);
        
        cvUrl = urlData.publicUrl;
      }

      // Prepare application data
      const applicationData = {
        email,
        building: formData.building.trim(),
        background: formData.background.trim(),
        contact: formData.contact.trim(),
        link: formData.link.trim() || null,
        cv_filename: formData.cv?.name || null,
        cv_url: cvUrl,
      };

      // Submit to Supabase
      const { error: submitError } = await supabase
        .from('applications')
        .insert([applicationData]);

      if (submitError) {
        console.error('Supabase error:', submitError);
        setError("Failed to submit application. Please try again.");
        setLoading(false);
        return;
      }

      // Success!
      setSubmitted(true);
    } catch (err) {
      console.error('Application submission error:', err);
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError("CV file size must be less than 5MB.");
        return;
      }
      
      // Check file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setError("CV must be a PDF, DOC, or DOCX file.");
        return;
      }
      
      setFormData({ ...formData, cv: file });
      // Clear any previous error
      if (error) setError(null);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <FadeInBlur duration={0.8}>
          <div className="text-center">
            <p className="text-gray-300 text-lg font-light tracking-wide text-center mb-4">
              Application submitted successfully!
            </p>
            <p className="text-gray-400 text-sm">
              If we're a fit, you'll hear within 72 hours.
            </p>
          </div>
        </FadeInBlur>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16">
      <FadeInBlur duration={0.8}>
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-900/20 border border-red-800 rounded px-3 py-2 text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* What are you building? */}
          <div>
            <label className="block text-gray-300 text-sm font-light mb-2">
              What AI use case are you exploring?
            </label>
            <input
              type="text"
              name="building"
              value={formData.building}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full bg-transparent border border-gray-800 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-gray-600 transition-colors duration-300 disabled:opacity-50"
            />
          </div>

          {/* Background */}
          <div>
            <label className="block text-gray-300 text-sm font-light mb-2">
              Current challenge or opportunity (50 words)
            </label>
            <textarea
              name="background"
              value={formData.background}
              onChange={handleChange}
              required
              rows={3}
              disabled={loading}
              className="w-full bg-transparent border border-gray-800 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-gray-600 transition-colors duration-300 resize-none disabled:opacity-50"
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
              disabled={loading}
              placeholder="e.g. john@example.com or +1234567890"
              className="w-full bg-transparent border border-gray-800 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-gray-600 transition-colors duration-300 disabled:opacity-50"
            />
          </div>

          {/* Link (optional) - More flexible */}
          <div>
            <label className="block text-gray-300 text-sm font-light mb-2">
              Company website (optional)
            </label>
            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleChange}
              disabled={loading}
              placeholder="e.g. yourcompany.com"
              className="w-full bg-transparent border border-gray-800 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-gray-600 transition-colors duration-300 disabled:opacity-50"
            />
          </div>

          {/* CV Upload (optional) */}
          <div>
            <label className="block text-gray-300 text-sm font-light mb-2">
              Reference materials (optional)
            </label>
            <input
              type="file"
              name="cv"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              disabled={loading}
              className="w-full text-gray-400 text-sm file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:font-light file:bg-gray-800 file:text-gray-300 hover:file:bg-gray-700 file:transition-colors file:duration-300 disabled:opacity-50"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white rounded-md px-8 py-2 text-sm font-light tracking-wider transition-colors duration-300 mt-8"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </FadeInBlur>
    </div>
  );
} 