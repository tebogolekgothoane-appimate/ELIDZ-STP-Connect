import { supabase } from '@/lib/supabase';

export interface SMMEVerification {
    id: string;
    user_id: string;
    document_url: string;
    document_type: 'CIPC' | 'Tax Clearance' | 'ID' | 'Other' | 'General';
    status: 'pending' | 'verified' | 'rejected';
    rejection_reason?: string;
    created_at: string;
    updated_at: string;
}

class VerificationService {
    async getVerificationStatus(userId: string): Promise<SMMEVerification | null> {
        const { data, error } = await supabase
            .from('sme_verifications')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        if (error) {
            if (error.code === 'PGRST116') return null; // No record found
            console.error('VerificationService.getVerificationStatus error:', error);
            throw error;
        }

        return data as SMMEVerification;
    }

    async submitVerification(userId: string, documentUrl: string, documentType: string = 'General'): Promise<SMMEVerification> {
        const { data, error } = await supabase
            .from('sme_verifications')
            .insert({
                user_id: userId,
                document_url: documentUrl,
                document_type: documentType,
                status: 'pending'
            })
            .select()
            .single();

        if (error) {
            console.error('VerificationService.submitVerification error:', error);
            throw error;
        }

        return data as SMMEVerification;
    }
    
    // Mock upload function - in a real app, this would upload to Supabase Storage
    async uploadDocument(fileUri: string): Promise<string> {
        // Simulate upload delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Return a mock URL
        // In real implementation: 
        // 1. Read file
        // 2. supabase.storage.from('documents').upload(...)
        // 3. Return public URL
        return `https://example.com/documents/${Date.now()}_doc.pdf`;
    }
}

export const verificationService = new VerificationService();

