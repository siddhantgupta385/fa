// Supabase Configuration
// Replace these with your actual Supabase credentials
// const SUPABASE_URL = 'https://bbinznlzxtdkzglcwmua.supabase.co'; // e.g., 'https://xxxxx.supabase.co'
// const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJiaW56bmx6eHRka3pnbGN3bXVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MzgzNzAsImV4cCI6MjA3MTExNDM3MH0.YKLlSJA8HTN9YAkXETjC53yHUvks2JR7WAPazPyb7Go'; // Your anon public key
const SUPABASE_URL = 'https://gouywraqaenqilhaaaug.supabase.co'; // The URL you received
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvdXl3cmFxYWVucWlsaGFhYXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyNDA0NTcsImV4cCI6MjA3NDgxNjQ1N30.jSxpcU6HI08RTpVaybW6nFLBjMlxbbnS8M5Qleoe-FM'; // The new key you received

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Database helper functions
class SupabaseDB {
    // Projects
    static async getProjects() {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    }

    static async createProject(project) {
        const { error } = await supabase
            .from('projects')
            .insert([project])
        ;
        if (error) throw error;
        return true;
    }

    static async updateProject(id, project) {
        const updateData = { ...project, updated_at: new Date() };
        // Handle media_urls properly
        if (project.media_urls === null) {
            delete updateData.media_urls;
        }
        const { error } = await supabase
            .from('projects')
            .update(updateData)
            .eq('id', id)
        ;
        if (error) throw error;
        return true;
    }

    static async deleteProject(id) {
        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id);
        if (error) throw error;
    }

    // Skills
    static async getSkills() {
        const { data, error } = await supabase
            .from('skills')
            .select('*')
            .order('category', { ascending: true });
        if (error) throw error;
        return data;
    }

    static async createSkill(skill) {
        const { data, error } = await supabase
            .from('skills')
            .insert([skill])
            .select();
        if (error) throw error;
        return data[0];
    }

    static async updateSkill(id, skill) {
        const { data, error } = await supabase
            .from('skills')
            .update(skill)
            .eq('id', id)
            .select();
        if (error) throw error;
        return data[0];
    }

    static async deleteSkill(id) {
        const { error } = await supabase
            .from('skills')
            .delete()
            .eq('id', id);
        if (error) throw error;
    }

    // Testimonials
    static async getTestimonials() {
        const { data, error } = await supabase
            .from('testimonials')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    }

    static async createTestimonial(testimonial) {
        const { data, error } = await supabase
            .from('testimonials')
            .insert([testimonial])
            .select();
        if (error) throw error;
        return data[0];
    }

    static async updateTestimonial(id, testimonial) {
        const updateData = { ...testimonial, updated_at: new Date() };
        // Only update image_url if it's provided
        if (testimonial.image_url === null) {
            delete updateData.image_url;
        }
        const { data, error } = await supabase
            .from('testimonials')
            .update(updateData)
            .eq('id', id)
            .select();
        if (error) throw error;
        return data[0];
    }

    static async deleteTestimonial(id) {
        const { error } = await supabase
            .from('testimonials')
            .delete()
            .eq('id', id);
        if (error) throw error;
    }

    // Services
    static async getServices() {
        const { data, error } = await supabase
            .from('services')
            .select('*')
            .order('created_at', { ascending: true });
        if (error) throw error;
        return data;
    }

    static async createService(service) {
        const { data, error } = await supabase
            .from('services')
            .insert([service])
            .select();
        if (error) throw error;
        return data[0];
    }

    static async updateService(id, service) {
        const { data, error } = await supabase
            .from('services')
            .update({ ...service, updated_at: new Date() })
            .eq('id', id)
            .select();
        if (error) throw error;
        return data[0];
    }

    static async deleteService(id) {
        const { error } = await supabase
            .from('services')
            .delete()
            .eq('id', id);
        if (error) throw error;
    }

    // Personal Details
    static async getPersonalDetails() {
        const { data, error } = await supabase
            .from('personal_details')
            .select('*')
            .limit(1);
        if (error) throw error;
        return data[0];
    }

    static async updatePersonalDetails(details) {
        const { data, error } = await supabase
            .from('personal_details')
            .update({ ...details, updated_at: new Date() })
            .eq('id', 1)
            .select();
        if (error) throw error;
        return data[0];
    }
}
