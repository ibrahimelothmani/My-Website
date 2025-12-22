-- Elite DevOps Portfolio - Row Level Security Policies
-- Configure public read access and admin-only write access

-- ============================================
-- ENABLE RLS ON ALL TABLES
-- ============================================
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- ============================================
-- EXPERIENCES POLICIES
-- ============================================

-- Public read access
CREATE POLICY "Allow public read access to experiences"
  ON public.experiences
  FOR SELECT
  USING (true);

-- Admin write access (requires authentication)
CREATE POLICY "Allow authenticated admin to insert experiences"
  ON public.experiences
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated admin to update experiences"
  ON public.experiences
  FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated admin to delete experiences"
  ON public.experiences
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- ============================================
-- PROJECTS POLICIES
-- ============================================

-- Public read access
CREATE POLICY "Allow public read access to projects"
  ON public.projects
  FOR SELECT
  USING (true);

-- Admin write access
CREATE POLICY "Allow authenticated admin to insert projects"
  ON public.projects
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated admin to update projects"
  ON public.projects
  FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated admin to delete projects"
  ON public.projects
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- ============================================
-- SKILLS POLICIES
-- ============================================

-- Public read access
CREATE POLICY "Allow public read access to skills"
  ON public.skills
  FOR SELECT
  USING (true);

-- Admin write access
CREATE POLICY "Allow authenticated admin to insert skills"
  ON public.skills
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated admin to update skills"
  ON public.skills
  FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated admin to delete skills"
  ON public.skills
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- ============================================
-- CERTIFICATIONS POLICIES
-- ============================================

-- Public read access
CREATE POLICY "Allow public read access to certifications"
  ON public.certifications
  FOR SELECT
  USING (true);

-- Admin write access
CREATE POLICY "Allow authenticated admin to insert certifications"
  ON public.certifications
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated admin to update certifications"
  ON public.certifications
  FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated admin to delete certifications"
  ON public.certifications
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- ============================================
-- CONTACT SUBMISSIONS POLICIES
-- ============================================

-- No public read access (privacy)
-- Public insert access (anyone can submit contact form)
CREATE POLICY "Allow public to insert contact submissions"
  ON public.contact_submissions
  FOR INSERT
  WITH CHECK (true);

-- Admin read access only
CREATE POLICY "Allow authenticated admin to read contact submissions"
  ON public.contact_submissions
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Admin delete access (for spam management)
CREATE POLICY "Allow authenticated admin to delete contact submissions"
  ON public.contact_submissions
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- ============================================
-- RATE LIMITING (Optional - Implement via Edge Function)
-- ============================================
-- For production, implement rate limiting on contact submissions
-- using Supabase Edge Functions to prevent spam
