// // CursorEffect.js
// import React, { useEffect, useRef } from 'react';

// export const CursorEffect = () => {
//   const cursorRef = useRef(null);
//   const cursorDotRef = useRef(null);

//   useEffect(() => {
//     const cursor = cursorRef.current;
//     const cursorDot = cursorDotRef.current;
    
//     const moveCursor = (e) => {
//       const mouseY = e.clientY;
//       const mouseX = e.clientX;
      
//       cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
//       cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
//     };
    
//     window.addEventListener('mousemove', moveCursor);
    
//     return () => {
//       window.removeEventListener('mousemove', moveCursor);
//     };
//   }, []);

//   return (
//     <>
//       <div ref={cursorRef} className="hidden md:block fixed w-8 h-8 rounded-full border-2 border-purple-500 pointer-events-none transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2 z-50" />
//       <div ref={cursorDotRef} className="hidden md:block fixed w-1 h-1 bg-purple-500 rounded-full pointer-events-none transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2 z-50" />
//     </>
//   );
// };
import React, { useEffect, useRef } from 'react';

export const CursorEffect = () => {
  const cursorRef = useRef(null);
  const cursorBorderRef = useRef(null);
  const lightsRef = useRef([]);
  const requestRef = useRef();
  const previousTimeRef = useRef();

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorBorder = cursorBorderRef.current;
    
    const onMouseMove = (event) => {
      const { clientX, clientY } = event;
      
      // Move main cursor
      cursor.style.transform = `translate(${clientX}px, ${clientY}px)`;
      cursorBorder.style.transform = `translate(${clientX}px, ${clientY}px)`;
      
      // Create light trail effect
      const light = document.createElement('div');
      light.className = 'cursor-light';
      light.style.left = `${clientX}px`;
      light.style.top = `${clientY}px`;
      document.body.appendChild(light);
      
      lightsRef.current.push({
        element: light,
        createdAt: Date.now()
      });
    };

    const animate = (time) => {
      if (previousTimeRef.current !== undefined) {
        // Remove old lights
        lightsRef.current = lightsRef.current.filter(light => {
          const age = Date.now() - light.createdAt;
          if (age > 1000) {
            light.element.remove();
            return false;
          }
          light.element.style.opacity = 1 - (age / 1000);
          return true;
        });
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMouseMove);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(requestRef.current);
      lightsRef.current.forEach(light => light.element.remove());
    };
  }, []);

  return (
    <>
      <style>
        {`
          // .cursor {
          //   width: 20px;
          //   height: 20px;
          //   background: rgba(255, 255, 255, 0.2);
          //   border-radius: 50%;
          //   position: fixed;
          //   pointer-events: none;
          //   z-index: 9999;
          //   transition: transform 0.1s ease;
          // }
          
          // .cursor-border {
          //   width: 40px;
          //   height: 40px;
          //   border: 2px solid rgba(255, 255, 255, 0.3);
          //   border-radius: 50%;
          //   position: fixed;
          //   pointer-events: none;
          //   z-index: 9998;
          //   transition: transform 0.15s ease;
          // }
          
          .cursor-light {
            position: fixed;
            width: 10px;
            height: 10px;
            background: radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9997;
            transition: opacity 0.5s ease;
          }
        `}
      </style>
      <div ref={cursorRef} className="cursor" />
      <div ref={cursorBorderRef} className="cursor-border" />
    </>
  );
};