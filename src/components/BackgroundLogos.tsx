"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function BackgroundLogos() {
  const techStack = [
    {
      name: "React",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    },
    {
      name: "TanStack Query",
      logoUrl: "https://tanstack.com/images/logos/logo-black.svg",
    },
    {
      name: "Node.js",
      logoUrl: "https://nodejs.org/static/images/logo.svg",
    },
    {
      name: "Next.js",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg",
    },
    {
      name: "TypeScript",
      logoUrl:
        "https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg",
    },
    {
      name: "Zustand",
      logoUrl:
        "https://raw.githubusercontent.com/pmndrs/zustand/main/examples/demo/public/logo192.png",
    },
    {
      name: "NestJS",
      logoUrl: "https://nestjs.com/img/logo-small.svg",
    },
    {
      name: "Tailwind CSS",
      logoUrl:
        "https://tailwindcss.com/_next/static/media/tailwindcss-mark.96ee6a5a.svg",
    },
    {
      name: "Express",
      logoUrl: "https://www.vectorlogo.zone/logos/expressjs/expressjs-icon.svg",
    },
    {
      name: "Docker",
      logoUrl: "https://www.vectorlogo.zone/logos/docker/docker-icon.svg",
    },
    {
      name: "AWS",
      logoUrl:
        "https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg",
    },
    {
      name: "Git",
      logoUrl: "https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg",
    },
    {
      name: "Framer Motion",
      logoUrl: "https://www.vectorlogo.zone/logos/framer/framer-icon.svg",
    },
    {
      name: "MUI",
      logoUrl: "https://mui.com/static/logo.svg",
    },
  ];

  const [mounted, setMounted] = useState(false);
  const [logoPositions, setLogoPositions] = useState<
    Array<{
      tech: { name: string; logoUrl: string };
      x: number;
      y: number;
      rotation: number;
    }>
  >([]);

  useEffect(() => {
    setMounted(true);
    // 클라이언트에서만 랜덤 값 생성 - 완전 랜덤 배치, 텍스트 영역 피하기
    const positions: Array<{
      tech: { name: string; logoUrl: string };
      x: number;
      y: number;
      rotation: number;
    }> = [];

    // 텍스트 영역을 피하기 위한 중앙 영역 정의 (가로 25-75%, 세로 30-70%)
    const textAreaLeft = 25;
    const textAreaRight = 75;
    const textAreaTop = 30;
    const textAreaBottom = 70;

    // Hero 컴포넌트 경계 (로고가 약간 나가도 자연스럽게 보이도록 범위 확장, 0-100% 범위)
    const minX = 0;
    const maxX = 100;
    const minY = 0;
    const maxY = 100;

    // 로고 간 최소 거리 (퍼센트 기준, 로고 크기 + 여유 공간)
    const minDistance = 12; // 약 12% 간격

    // 두 위치 간 거리 계산 함수
    const getDistance = (
      x1: number,
      y1: number,
      x2: number,
      y2: number
    ): number => {
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    };

    // 위치가 기존 위치들과 겹치지 않는지 확인
    const isPositionValid = (
      x: number,
      y: number,
      existingPositions: Array<{ x: number; y: number }>
    ): boolean => {
      // 텍스트 영역 체크
      if (
        x >= textAreaLeft &&
        x <= textAreaRight &&
        y >= textAreaTop &&
        y <= textAreaBottom
      ) {
        return false;
      }

      // 경계 체크
      if (x < minX || x > maxX || y < minY || y > maxY) {
        return false;
      }

      // 기존 위치와의 거리 체크
      for (const pos of existingPositions) {
        if (getDistance(x, y, pos.x, pos.y) < minDistance) {
          return false;
        }
      }

      return true;
    };

    // 텍스트 영역을 피하고 겹치지 않는 랜덤 위치 생성 함수
    const getValidRandomPosition = (
      existingPositions: Array<{ x: number; y: number }>
    ): { x: number; y: number } | null => {
      let x: number, y: number;
      let attempts = 0;
      const maxAttempts = 200; // 충분한 시도 횟수

      do {
        x = minX + Math.random() * (maxX - minX);
        y = minY + Math.random() * (maxY - minY);
        attempts++;
      } while (
        attempts < maxAttempts &&
        !isPositionValid(x, y, existingPositions)
      );

      if (attempts >= maxAttempts) {
        return null; // 유효한 위치를 찾지 못함
      }

      return { x, y };
    };

    // 모든 로고를 겹치지 않게 배치
    const existingPositions: Array<{ x: number; y: number }> = [];
    techStack.forEach((tech) => {
      const position = getValidRandomPosition(existingPositions);
      if (position) {
        positions.push({
          tech,
          x: position.x,
          y: position.y,
          rotation: -20 + Math.random() * 40,
        });
        existingPositions.push(position);
      }
    });

    setLogoPositions(positions);
  }, []);

  if (!mounted || logoPositions.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {logoPositions.map(({ tech, x, y }) => {
        return (
          <motion.div
            key={tech.name}
            className="absolute opacity-50 dark:opacity-35 blur-[2px]"
            style={{
              left: `${x}%`,
              top: `${y}%`,
            }}
          >
            <img
              src={tech.logoUrl}
              alt={tech.name}
              className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain opacity-50 dark:opacity-35"
              onError={(e) => {
                // 로고 로드 실패 시 텍스트로 대체
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                const parent = target.parentElement;
                if (parent) {
                  const textSpan = document.createElement("span");
                  textSpan.className =
                    "text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-300 dark:text-slate-700 whitespace-nowrap";
                  textSpan.textContent = tech.name;
                  parent.appendChild(textSpan);
                }
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
