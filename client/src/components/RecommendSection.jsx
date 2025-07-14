import React from "react";
import { ArrowRight } from "lucide-react";

const RecommendSection = () => {
  return (
    <section className="bg-[#101010] text-white px-24 py-20 relative">
      {/* 배경 이미지 */}
      <img
        src="/images/turntable.jpg"
        alt="bg"
        className="absolute inset-0 w-full h-full object-cover opacity-10"
      />

      <div className="relative z-10">
        <h2 className="text-2xl font-semibold mb-3">
          Vinaria <span className="text-[#F7C96B]">RECOMMENDS</span>
        </h2>
        <p className="text-sm text-white/60 mb-10 leading-relaxed">
          지금 나에게 LP를 고르긴 어렵다면?
          <br />
          Vinaria의 큐레이션에 직접 물어보세요
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className="border border-white/30 rounded-xl p-5 flex justify-between items-center hover:bg-white/10 transition">
            <p className="text-sm font-medium">
              들을 LP 음원을 찾고 있다면?
            </p>
            <ArrowRight />
          </div>
          <div className="border border-white/30 rounded-xl p-5 flex justify-between items-center hover:bg-white/10 transition">
            <p className="text-sm font-medium">
              소장할 LP를 찾고 있다면?
            </p>
            <ArrowRight />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecommendSection;
