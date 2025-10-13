"use client";
import { Button } from "@/shared/ui/button";
import { useEffect, useState, useMemo, memo, useCallback } from "react";

export type OauthAgreeType = {
  scope_id: number;
  title: string;
  description: string;
  is_essential: boolean;
  agreed?: boolean;
};

const CheckIcon = memo(
  ({
    checked,
    size = "title",
  }: {
    checked: boolean;
    size?: "title" | "item";
  }) => {
    const isTitle = size === "title";
    const containerClasses = isTitle ? "w-7 h-7" : "w-5 h-5";
    const svgStrokeWidth = isTitle ? 4 : 5;
    const svgClasses = isTitle ? "size-4" : "size-3";

    const icon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={svgStrokeWidth}
        stroke="currentColor"
        className={svgClasses}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.5 12.75 6 6 9-13.5"
        />
      </svg>
    );

    const baseClasses =
      "flex items-center justify-center rounded-full scale-75";
    const checkedClasses = "bg-primary text-white";
    const uncheckedClasses = "border-2 border-foreground/50 text-foreground/50";

    return (
      <div
        className={`${baseClasses} ${containerClasses} ${
          checked ? checkedClasses : uncheckedClasses
        }`}
      >
        {icon}
      </div>
    );
  }
);
CheckIcon.displayName = "CheckIcon";

export function OauthAgreeForm({
  toAgree,
  redirectTo,
  onChange,
  onSubmit,
}: {
  toAgree: OauthAgreeType[];
  redirectTo: string;
  onChange?: (e: string[]) => void;
  onSubmit?: (e: { agreed: number[]; titles: string[] }) => void;
}) {
  const { essentials, nonEssentials } = useMemo(() => {
    const essentials: OauthAgreeType[] = [];
    const nonEssentials: OauthAgreeType[] = [];
    toAgree.forEach((item) => {
      if (item.is_essential) {
        essentials.push(item);
      } else {
        nonEssentials.push(item);
      }
    });
    return { essentials, nonEssentials };
  }, [toAgree]);

  const [essentialAgreed, setEssentialAgreed] = useState(
    () => essentials.every((item) => item.agreed) || essentials.length === 0
  );
  const [nonEssentialAgreed, setNonEssentialAgreed] = useState<string[]>(() =>
    nonEssentials.filter((item) => item.agreed).map((item) => item.title)
  );

  const allNonEssentialsAgreed = useMemo(
    () =>
      nonEssentials.length > 0
        ? nonEssentialAgreed.length === nonEssentials.length
        : true,
    [nonEssentialAgreed.length, nonEssentials.length]
  );

  const allAgreed = essentialAgreed && allNonEssentialsAgreed;

  useEffect(() => {
    const agreedTitles: string[] = [...nonEssentialAgreed];
    if (essentialAgreed) {
      agreedTitles.push(...essentials.map((item) => item.title));
    }
    onChange?.(agreedTitles);
  }, [essentialAgreed, nonEssentialAgreed, essentials, onChange]);

  const handleToggleAll = useCallback(() => {
    const nextState = !allAgreed;
    setEssentialAgreed(nextState);
    setNonEssentialAgreed(
      nextState ? nonEssentials.map((item) => item.title) : []
    );
  }, [allAgreed, nonEssentials]);

  const handleToggleAllEssentials = useCallback(() => {
    setEssentialAgreed((prev) => !prev);
  }, []);

  const handleToggleAllNonEssentials = useCallback(() => {
    if (allNonEssentialsAgreed) {
      setNonEssentialAgreed([]);
    } else {
      setNonEssentialAgreed(nonEssentials.map((item) => item.title));
    }
  }, [allNonEssentialsAgreed, nonEssentials]);

  const handleToggleNonEssential = useCallback((title: string) => {
    setNonEssentialAgreed((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  }, []);

  const handleSubmit = () => {
    const titles: string[] = [...nonEssentialAgreed];
    if (essentialAgreed) {
      titles.push(...essentials.map((item) => item.title));
    }
    const agreed = toAgree
      .filter((item) => titles.includes(item.title))
      .map((item) => item.scope_id);
    if (!onSubmit) return;
    onSubmit({ agreed, titles });
  };

  return (
    <div className="flex-1 my-5">
      <AgreeTitle
        item={{
          title: "전체 동의하기",
          agreed: allAgreed,
        }}
        onChange={handleToggleAll}
      />
      <div className="w-[95%] mx-auto h-[1px] bg-foreground/10 my-3"></div>
      <div className="flex flex-col gap-2">
        {essentials.length > 0 ? (
          <AgreeTitle
            item={{
              title: "필수 동의 항목",
              agreed: essentialAgreed,
              description: essentials.map((item) => item.title).join(", "),
            }}
            onChange={handleToggleAllEssentials}
          />
        ) : (
          <></>
        )}
        <div>
          {nonEssentials.length > 0 && (
            <>
              <AgreeTitle
                item={{
                  title: "선택 동의 항목",
                  agreed: allNonEssentialsAgreed,
                }}
                onChange={
                  nonEssentials.length > 0
                    ? handleToggleAllNonEssentials
                    : undefined
                }
              />
              <div className="flex flex-col gap-1 my-3">
                {nonEssentials.map((item) => (
                  <AgreeItem
                    item={{
                      ...item,
                      agreed: nonEssentialAgreed.includes(item.title),
                    }}
                    onChange={() => handleToggleNonEssential(item.title)}
                    key={item.title}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="w-[95%] mx-auto h-[1px] bg-foreground/10 mt-5"></div>
      <div className="flex flex-col gap-1 mt-5">
        <Button
          onClick={handleSubmit}
          className="w-full cursor-pointer"
          disabled={!essentialAgreed}
        >
          동의하기
        </Button>
        <Button
          onClick={() => {
            const url = new URL(redirectTo);
            window.location.href = url.origin;
          }}
          className="w-full cursor-pointer"
          variant={"secondary"}
        >
          취소하기
        </Button>
      </div>
    </div>
  );
}

const AgreeTitle = memo(
  ({
    item,
    onChange,
  }: {
    item: { title: string; description?: string; agreed: boolean };
    onChange?: () => void;
  }) => {
    return (
      <div className="flex items-center font-semibold justify-between">
        <div
          onClick={onChange}
          className={`flex flex-1 gap-1 items-center ${
            onChange ? "cursor-pointer" : ""
          }`}
        >
          <CheckIcon checked={item.agreed} size="title" />
          <p className="font-bold">{item.title}</p>
        </div>
        {item.description && (
          <p className="text-xs text-foreground/40">{item.description}</p>
        )}
      </div>
    );
  }
);
AgreeTitle.displayName = "AgreeTitle";

const AgreeItem = memo(
  ({ item, onChange }: { item: OauthAgreeType; onChange?: () => void }) => {
    return (
      <div className="flex items-center font-semibold justify-between">
        <div
          onClick={onChange}
          className={`flex flex-1 gap-1 ml-8 items-center ${
            onChange ? "cursor-pointer" : ""
          }`}
        >
          <CheckIcon checked={!!item.agreed} size="item" />
          <p className="text-sm">{item.title}</p>
        </div>
        <p className="text-xs text-foreground/40">{item.description}</p>
      </div>
    );
  }
);
AgreeItem.displayName = "AgreeItem";
