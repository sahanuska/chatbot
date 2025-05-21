document.addEventListener('DOMContentLoaded', function() {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatContainer = document.getElementById('chat-container');
    const clearBtn = document.getElementById('clear-chat');

    // Auto-resize textarea
    userInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    // Add message to chat
    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        
        messageDiv.innerHTML = `
            <div class="avatar">
                <i class="fas ${isUser ? 'fa-user' : 'fa-robot'}"></i>
            </div>
            <div class="message-content">
                <div class="message-bubble">
                    ${content}
                </div>
                <div class="message-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            </div>
        `;
        
        chatContainer.appendChild(messageDiv);
        scrollToBottom();
    }

    // Show typing indicator
    function showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message';
        typingDiv.id = 'typing-indicator';
        
        typingDiv.innerHTML = `
            <div class="avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        
        chatContainer.appendChild(typingDiv);
        scrollToBottom();
    }

    // Hide typing indicator
    function hideTyping() {
        const typing = document.getElementById('typing-indicator');
        if (typing) typing.remove();
    }

    // Scroll to bottom
    function scrollToBottom() {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // Handle form submission
    chatForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const message = userInput.value.trim();
        if (!message) return;
        
        // Add user message and clear input
        addMessage(message, true);
        userInput.value = '';
        userInput.style.height = 'auto';
        
        // Show typing indicator
        showTyping();
        
        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message })
            });
            
            if (!response.ok) throw new Error('Network error');
            
            const data = await response.json();
            hideTyping();
            
            if (data.error) {
                addMessage(`Error: ${data.error}`);
            } else {
                addMessage(data.response);
            }
        } catch (error) {
            hideTyping();
            addMessage("Sorry, I'm having trouble connecting. Please try again later.");
            console.error('Error:', error);
        }
    });

    // Clear chat history
    clearBtn.addEventListener('click', async function() {
        try {
            const response = await fetch('/clear', {
                method: 'POST'
            });
            
            if (response.ok) {
                chatContainer.innerHTML = `
                    <div class="message bot-message">
                        <div class="avatar">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div class="message-content">
                            <div class="message-bubble">
                                <p>Hello! I'm Alex, your TechCorp support assistant. How can I help you today?</p>
                            </div>
                            <div class="message-time">Just now</div>
                        </div>
                    </div>
                `;
            }
        } catch (error) {
            console.error('Error clearing chat:', error);
        }
    });

    // Handle Enter/Shift+Enter
    userInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            chatForm.dispatchEvent(new Event('submit'));
        }
    });

    // Focus input on load
    userInput.focus();
});