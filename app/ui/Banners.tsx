'use client';
import { getRoute } from '~lib/getRoute';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
// TODO: click events
// @see-also https://github.com/imsyy/SPlayer/blob/9fa59359290558347ba86f03da699738e7398e44/src/components/Banner/index.vue#L38
export default function Banners({ data }: { data: Banner[] }) {
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div>
      {/* sticky 对于framermotion bug, 需要多加一个div */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-3 not-prose"
        variants={container}
        initial="hidden"
        animate="visible">
        {data.map((banner) => (
          <motion.div key={banner.imageUrl} variants={item}>
            {/* <span>{banner.typeTitle}</span> */}
            <Link href={getRoute(banner)}>
              <Image
                src={banner.imageUrl}
                alt={banner.typeTitle}
                title={banner.typeTitle}
                priority={true}
                width={1080}
                className="hover:cursor-pointer rounded w-full"
                height={480}
              />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
