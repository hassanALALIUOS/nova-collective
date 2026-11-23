document.querySelectorAll('.menu-toggle').forEach(b=>b.addEventListener('click',()=>{const nav=document.querySelector('.navlinks');const open=nav.classList.toggle('open');b.setAttribute('aria-expanded',String(open));}));document.querySelectorAll('[data-contact]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const name=form.querySelector('[name=name]').value.trim(),email=form.querySelector('[name=email]').value.trim(),message=form.querySelector('[name=message]').value.trim();const status=form.querySelector('.status');if(!name||!email||!message){status.textContent='Please complete all fields.';return;}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){status.textContent='Please enter a valid email address.';return;}const subject=encodeURIComponent('Portfolio inquiry from '+name);const body=encodeURIComponent('From: '+name+' ('+email+')\n\n'+message);status.textContent='Your email application will open. Please send the draft to complete your message.';window.location.href='mailto:REPLACE_WITH_MEMBER_EMAIL@example.com?subject='+subject+'&body='+body;}));

// Decorative mouse trail. Keep it out of the way of links and media controls.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const bubbleColors = ['#38bdf8', '#67e8f9', '#a78bfa'];
let lastBubbleTime = -Infinity;

document.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || reducedMotion.matches ||
        event.timeStamp - lastBubbleTime < 40) {
        return;
    }
    lastBubbleTime = event.timeStamp;

    const bubble = document.createElement('span');
    bubble.setAttribute('aria-hidden', 'true');
    const size = 10 + Math.random() * 14;
    const color = bubbleColors[Math.floor(Math.random() * bubbleColors.length)];
    Object.assign(bubble.style, {
        position: 'fixed',
        left: (event.clientX - size / 2) + 'px',
        top: (event.clientY - size / 2) + 'px',
        width: size + 'px',
        height: size + 'px',
        border: '2px solid ' + color,
        borderRadius: '50%',
        boxShadow: 'inset 0 0 5px ' + color,
        pointerEvents: 'none',
        zIndex: '9999'
    });
    document.body.append(bubble);
    const drift = Math.random() * 44 - 22;
    const animation = bubble.animate([
        { transform: 'scale(0.65)', opacity: 0.95 },
        { transform: 'translate(' + drift + 'px, -60px) scale(1.25)', opacity: 0 }
    ], { duration: 700, easing: 'ease-out' });
    animation.onfinish = () => bubble.remove();
    animation.oncancel = () => bubble.remove();
}, { passive: true });
