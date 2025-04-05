'use client';
import { motion } from 'framer-motion';
import { BoltIcon, ChartBarIcon, CpuChipIcon, SparklesIcon } from '@heroicons/react/20/solid';

const features = [
  {
    name: 'Lightning Fast',
    description: 'Process complex tasks in seconds with our optimized AI models',
    icon: BoltIcon,
  },
  {
    name: 'Intelligent Analytics',
    description: 'Get actionable insights from your data with our advanced algorithms',
    icon: ChartBarIcon,
  },
  {
    name: 'Cutting-Edge Technology',
    description: 'Built on the latest breakthroughs in artificial intelligence',
    icon: CpuChipIcon,
  },
  {
    name: 'Stunning Results',
    description: 'Generate high-quality outputs that exceed expectations',
    icon: SparklesIcon,
  },
];

export default function FeaturesSection() {
  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-base font-semibold leading-7 text-cyan-400"
          >
            Everything you need
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Powerful features for creative minds
          </motion.p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col rounded-2xl bg-gray-800 p-8 hover:bg-gray-700 transition-colors duration-300"
              >
                <div className="flex items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-900/20 text-cyan-400">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="ml-4 text-lg font-semibold leading-7 text-white">{feature.name}</h3>
                </div>
                <p className="mt-4 flex-1 text-base leading-7 text-gray-400">{feature.description}</p>
                <div className="mt-6">
                  <a href="#" className="text-sm font-semibold leading-6 text-cyan-400">
                    Learn more <span aria-hidden="true">→</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}