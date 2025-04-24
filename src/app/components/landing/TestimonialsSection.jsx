'use client';
import { motion } from 'framer-motion';
import { PaintBrushIcon, PhotoIcon, CodeBracketIcon, SparklesIcon } from '@heroicons/react/20/solid';

const tools = [
  {
    name: 'Image Generator',
    description: 'Create stunning visuals from text prompts with our advanced diffusion models',
    icon: PhotoIcon,
    features: ['Text-to-image', 'Style transfer', 'High-resolution output'],
    color: 'from-purple-500 to-indigo-600'
  },
  {
    name: 'Design Assistant',
    description: 'Automate repetitive design tasks and generate layout variations instantly',
    icon: PaintBrushIcon,
    features: ['Auto-layouts', 'Color palettes', 'Template generation'],
    color: 'from-cyan-500 to-blue-600'
  },
  {
    name: 'Code Generator',
    description: 'Convert designs to clean, production-ready code in multiple frameworks',
    icon: CodeBracketIcon,
    features: ['React/Vue components', 'Responsive output', 'Tailwind CSS'],
    color: 'from-emerald-500 to-teal-600'
  },
  {
    name: 'Content Enhancer',
    description: 'Improve and optimize your marketing content with AI suggestions',
    icon: SparklesIcon,
    features: ['SEO optimization', 'Tone adjustment', 'Multilingual support'],
    color: 'from-amber-500 to-orange-600'
  }
];

export default function ToolsSection() {
  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Our Powerful AI Tools</h2>
          <p className="mt-6 text-lg leading-8 text-gray-400">
            Cutting-edge solutions designed to supercharge your creative workflow
          </p>
        </motion.div>
        
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col"
            >
              <div className="relative flex-1 rounded-2xl bg-gray-800 p-8 hover:bg-gray-700 transition-all duration-300 group overflow-hidden">
                {/* Gradient background effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${tool.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className="relative">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r ${tool.color} text-white`}>
                    <tool.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold leading-7 text-white">
                    <span className="relative">
                      {tool.name}
                      <span className={`absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r ${tool.color} transition-all duration-300 group-hover:w-full`}></span>
                    </span>
                  </h3>
                  <p className="mt-2 text-base leading-7 text-gray-400">{tool.description}</p>
                  
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-gray-300">Key Features:</h4>
                    <ul className="mt-2 space-y-2">
                      {tool.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <svg className={`h-2 w-2 mr-2 flex-none text-${tool.color.split(' ')[0].split('-')[1]}-400`} fill="currentColor" viewBox="0 0 8 8">
                            <circle cx="4" cy="4" r="3" />
                          </svg>
                          <span className="text-sm text-gray-400">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
            
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <a
            href="#"
            className="text-sm font-semibold leading-6 text-cyan-400 hover:text-cyan-300 inline-flex items-center"
          >
            Explore all tools and features <span aria-hidden="true" className="ml-2">→</span>
          </a>
        </motion.div>
      </div>
    </div>
  );
}