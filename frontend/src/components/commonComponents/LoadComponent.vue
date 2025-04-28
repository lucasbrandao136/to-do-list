<template>
    <div class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
      <div class="flex space-x-4">
        <div class="rounded-full h-4 w-4 bg-violet-400 animate-pulse" style="animation-delay: 0s"></div>
        <div class="rounded-full h-4 w-4 bg-violet-500 animate-pulse" style="animation-delay: 0.2s"></div>
        <div class="rounded-full h-4 w-4 bg-violet-600 animate-pulse" style="animation-delay: 0.4s"></div>
        <div class="rounded-full h-4 w-4 bg-violet-700 animate-pulse" style="animation-delay: 0.6s"></div>
        <div class="rounded-full h-4 w-4 bg-violet-800 animate-pulse" style="animation-delay: 0.8s"></div>
      </div>
    </div>
  </template>
  
  <style>
  .animate-pulse {
    animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.9); }
  }
  </style>


<!-- <template>
    <div class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50 overflow-hidden">
      <div 
        v-for="(circle, index) in circles" 
        :key="index"
        class="absolute rounded-full animate-custom-ping"
        :class="circle.color"
        :style="{
          width: `${circle.size}px`,
          height: `${circle.size}px`,
          left: `${circle.left}%`,
          top: `${circle.top}%`,
          'animation-delay': `${circle.delay}s`,
          'animation-duration': `${circle.duration}s`
        }"
      ></div>
      
      <div class="relative z-10 text-violet-700 font-medium text-lg">Carregando...</div>
    </div>
  </template>
  
  <script setup lang="ts">
  interface Circle {
    size: number
    left: number
    top: number
    delay: number
    duration: number
    color: string
  }
  
  const colors = [
    'bg-violet-300',
    'bg-violet-400',
    'bg-violet-500',
    'bg-violet-600',
    'bg-violet-700'
  ]
  
  const generateRandomCircles = (count: number): Circle[] => {
    return Array.from({ length: count }, (_, i) => ({
      size: Math.floor(Math.random() * 30) + 10,
      left: Math.floor(Math.random() * 90) + 5,
      top: Math.floor(Math.random() * 90) + 5,
      delay: Math.random() * 1.5,
      duration: Math.floor(Math.random() * 2) + 1.5,
      color: colors[Math.floor(Math.random() * colors.length)]
    }))
  }
  
  const circles = generateRandomCircles(30)
  </script>
  
  <style>
  @keyframes custom-ping {
    0% {
      transform: scale(0.8);
      opacity: 0.7;
    }
    70%, 100% {
      transform: scale(1.8);
      opacity: 0;
    }
  }
  .animate-custom-ping {
    animation: custom-ping infinite cubic-bezier(0.4, 0, 0.6, 1);
  }
  </style> -->

<!-- <template>
    <div class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
      <div class="relative h-32 w-32">
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="rounded-full h-6 w-6 bg-violet-800 animate-custom-ping" style="animation-delay: 0s"></div>
        </div>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="rounded-full h-10 w-10 bg-violet-600 animate-custom-ping" style="animation-delay: 0.2s"></div>
        </div>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="rounded-full h-16 w-16 bg-violet-400 animate-custom-ping" style="animation-delay: 0.4s"></div>
        </div>
      </div>
    </div>
  </template>
  
  <style>
  @keyframes custom-ping {
    0% {
      transform: scale(0.8);
      opacity: 0.7;
    }
    70%, 100% {
      transform: scale(1.4);
      opacity: 0;
    }
  }
  .animate-custom-ping {
    animation: custom-ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
  }
  </style>
 -->

<!-- 
<template>
    <div class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
      <div class="relative h-32 w-32">
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="rounded-full h-6 w-6 bg-violet-800 animate-ping opacity-75" style="animation-delay: 0s"></div>
        </div>
        
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="rounded-full h-10 w-10 bg-violet-600 animate-ping opacity-75" style="animation-delay: 0.2s"></div>
        </div>
        
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="rounded-full h-16 w-16 bg-violet-400 animate-ping opacity-75" style="animation-delay: 0.4s"></div>
        </div>
      </div>
    </div>
  </template> -->