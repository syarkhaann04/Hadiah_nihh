
        // Setup Audio & Video
        const bgMusic = document.getElementById('bg-music');
        const bgVideo = document.getElementById('bg-video');
        const unmuteBtn = document.getElementById('unmute-btn');
        let musicPlaying = false;

        function playMusic() {
            bgMusic.play().then(() => {
                musicPlaying = true;
                unmuteBtn.classList.remove('show');
            }).catch(error => {
                console.log("Autoplay diblokir browser, tampilkan tombol unmute");
                unmuteBtn.classList.add('show');
            });
        }

        window.addEventListener('load', () => {
            playMusic();
        });

        unmuteBtn.addEventListener('click', () => {
            playMusic();
        });

        document.addEventListener('click', () => {
            if (!musicPlaying) {
                playMusic();
            }
        }, { once: true });

        document.addEventListener('touchstart', () => {
            if (!musicPlaying) {
                playMusic();
            }
        }, { once: true });

        window.addEventListener('beforeunload', () => {
            bgMusic.pause();
            bgMusic.currentTime = 0;
        });

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                bgMusic.pause();
            } else {
                if (musicPlaying) {
                    bgMusic.play();
                }
            }
        });

        const heart = document.getElementById('heart');
        const soundEffect = new Audio('select-sound-121244.mp3'); 
        
        const words = [
            "Haiii Indaahhhh.... 👋",             
            "ada pesan nih buat indaahh ✨", 
            "dibaca pelan pelan aja yaa ndah",      
            "Jangan lupa tersenyum 😊",
            "jangan lupa makan yaa, tubuhmu juga butuh di perhatikan",
            "minum air dulu, jgn lupa jaga diri",
            "kalau capek, istirahat sebentar gpp kok",  
            "jangan terlalu keras sama diri sendiri yaa ndah",
            "inget indah ga lemah, jadi gpp ngeluh kalo lg lelah",
            "jangan lupa ibadah yaa,biar hatinya tenang",
            "indah udh berjuang sejauh ini, itu bukan hal kecil",
            "gpp klo hari ini ngerasa berat,indah tetep kuat",
            "jangan nyerah yaa ndah,satu langkah kecil pun berarti",
            "lakuin hari ini semampunya aja,itu udh cukup",
            "istirahat bukan berarti menyerah",
            "diri indah itu berharga,jangan lupa itu",
            "jangan lupa maafin diri sendiri klo mau tidur",
            "semoga semuanya sesuai sama yg indah harapkan",
            "semoga indah menemukan alasan kecil untuk tersenyum",
            "semoga apapun yg indah hadapi hari ini bisa dilewati dengan tenang",
            "jangan lupa tarik napas dulu kalo mulai capek",
            "pelan pelan aja ndah klo masalah lagi berat",
            "indah layak dapet waktu buat tenang",
            "kalo lg byk pikiran semoga tetep bisa tenang",
            "apapun hasilnya hari ini, indah tetep patut dihargai",
            "udah ituu aja yaa ndahh heheee....",
            "makasih udah luangin waktunya di kesibukan indah",
            "semaaangaatttt buat indaaahhh...."
        ];

        let clickIndex = 0; 

        function handleInteraction(e) {
            e.preventDefault(); 
            
            let clientX, clientY;

            if(e.type === 'touchstart') {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else {
                clientX = e.clientX;
                clientY = e.clientY;
            }

            playClickSound();
            showNextText(clientX, clientY);
            createFloatingHearts(clientX, clientY);
        }

        heart.addEventListener('mousedown', handleInteraction);
        heart.addEventListener('touchstart', handleInteraction);


        function playClickSound() {
            soundEffect.currentTime = 0; 
            soundEffect.play().catch(error => {
                // Ignore error
            });
        }

        function showNextText(x, y) {
            const word = document.createElement('div');
            word.classList.add('floating-word');
            
            word.innerText = words[clickIndex % words.length];
            clickIndex++;
            
            document.body.appendChild(word);

            const rect = heart.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const angle = Math.atan2(y - centerY, x - centerX);
            
            const isMobile = window.innerWidth < 768;
            const velocity = isMobile ? 180 : 350; 
            
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;

            const animation = word.animate([
                { 
                    transform: 'translate(-50%, -50%) scale(0.5)', 
                    opacity: 0,
                    offset: 0
                },
                { 
                    transform: 'translate(-50%, -50%) scale(1.2)', 
                    opacity: 1,
                    offset: 0.1
                },
                { 
                    transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(1)`, 
                    opacity: 0,
                    offset: 1
                }
            ], {
                duration: 20000, 
                easing: 'cubic-bezier(0.25, 1, 0.5, 1)', 
                fill: 'forwards'
            });

            animation.onfinish = () => {
                word.remove();
            };
        }

        function createFloatingHearts(x, y) {
            const heartCount = 5 + Math.floor(Math.random() * 4); 
            
            for (let i = 0; i < heartCount; i++) {
                setTimeout(() => {
                    const heartElem = document.createElement('div');
                    heartElem.classList.add('floating-heart');
                    
                    heartElem.innerHTML = `
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                    `;
                    
                    heartElem.style.left = x + 'px';
                    heartElem.style.top = y + 'px';
                    
                    document.body.appendChild(heartElem);

                    const rect = heart.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    
                    const baseAngle = Math.atan2(y - centerY, x - centerX);
                    const spread = (Math.random() - 0.5) * 1.5; 
                    const finalAngle = baseAngle + spread;

                    const isMobile = window.innerWidth < 768;
                    const maxDist = isMobile ? 120 : 200;
                    const distance = 80 + Math.random() * maxDist; 
                    
                    const tx = Math.cos(finalAngle) * distance;
                    const ty = Math.sin(finalAngle) * distance;
                    const rotation = Math.random() * 720 - 360; 

                    const animation = heartElem.animate([
                        { 
                            transform: 'translate(-50%, -50%) scale(0) rotate(0deg)', 
                            opacity: 0,
                            offset: 0
                        },
                        { 
                            transform: 'translate(-50%, -50%) scale(1.2) rotate(45deg)', 
                            opacity: 1,
                            offset: 0.15
                        },
                        { 
                            transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0.8) rotate(${rotation}deg)`, 
                            opacity: 0,
                            offset: 1
                        }
                    ], {
                        duration: 1200 + Math.random() * 600, 
                        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', 
                        fill: 'forwards'
                    });

                    animation.onfinish = () => {
                        heartElem.remove();
                    };
                }, i * 50);
            }
        }
