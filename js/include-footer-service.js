// Footer Include Functionality for Service Pages
document.addEventListener('DOMContentLoaded', function() {
    // Function to load footer
    function loadFooter() {
        const footerPlaceholder = document.getElementById('footer-placeholder');
        
        if (!footerPlaceholder) {
            console.warn('Footer placeholder not found');
            return;
        }

        fetch('../includes/footer.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                footerPlaceholder.innerHTML = html;
            })
            .catch(error => {
                console.error('Error loading footer:', error);
                // Fallback footer if include fails
                footerPlaceholder.innerHTML = `
                    <div class="mobile-footer">
                        <div class="footer-content">
                            <div class="footer-actions">
                                <a href="tel:+97143805515" class="footer-action">
                                    <i class="fas fa-phone"></i>
                                    <span>Call Us</span>
                                </a>
                                <a href="https://wa.me/+97143805515" class="footer-action">
                                    <i class="fab fa-whatsapp"></i>
                                    <span>WhatsApp</span>
                                </a>
                            </div>
                        </div>
                    </div>
                `;
            });
    }

    // Load footer immediately
    loadFooter();
}); 