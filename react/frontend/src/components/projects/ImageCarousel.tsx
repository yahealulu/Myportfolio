import React, { useState, useEffect, useRef } from 'react';

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const openModal = () => {
    if (!carouselRef.current) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const modalImage = document.createElement('img');
    modalImage.src = images[currentIndex];
    modalImage.className = 'modal-image';
    
    const closeButton = document.createElement('button');
    closeButton.className = 'close-modal';
    closeButton.innerHTML = '×';
    closeButton.onclick = () => modal.remove();
    
    modal.appendChild(modalImage);
    modal.appendChild(closeButton);
    document.body.appendChild(modal);
    
    setTimeout(() => modal.classList.add('active'), 10);
  };

  // Cleanup any modal on unmount
  useEffect(() => {
    return () => {
      const modal = document.querySelector('.modal');
      if (modal) {
        modal.remove();
      }
    };
  }, []);

  return (
    <div className="image-carousel" onClick={openModal} ref={carouselRef}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Project preview ${index + 1}`}
          className="carousel-image"
          style={{ display: index === currentIndex ? 'block' : 'none' }}
          loading="lazy"
        />
      ))}
      <div className="carousel-nav" onClick={(e) => e.stopPropagation()}>
        {images.map((_, index) => (
          <div
            key={index}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              handleDotClick(index);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;