import "server-only";
import { CategoryModel, CuisineModel, RecipeModel } from "../model";
import connectDB from "../mongodb";
import type { RecipeInput } from "../validator/recipe";

export const bootstrapCuisines = async () => {
  await connectDB();

  const cuisines = ["意大利菜", "中国菜", "北欧料理"];

  await CuisineModel.bulkWrite(
    cuisines.map((name) => ({
      updateOne: {
        filter: { name },
        update: { $setOnInsert: { name } },
        upsert: true,
      },
    })),
  );
};

export const bootstrapCategories = async () => {
  await connectDB();

  const categories = [
    "开胃菜/前餐",
    "主菜/正餐",
    "汤品",
    "沙拉",
    "主食",
    "面包",
    "甜点",
    "饮料/饮品",
  ];

  await CategoryModel.bulkWrite(
    categories.map((name) => ({
      updateOne: {
        filter: { name },
        update: { $setOnInsert: { name } },
        upsert: true,
      },
    })),
  );
};

export const bootstrapRecipesForLocalDevelopment = async () => {
  if (process.env.NODE_ENV !== "development") {
    console.info("Recipe bootstraping is only enabled for local development!!");
    return;
  }

  await connectDB();

  const recipes: RecipeInput[] = [
    {
      name: "红烧肉",
      description:
        "红烧肉是一道经典的中华传统名菜，以五花肉为主料，通过炒糖色、加酱油调味、慢火焖煮而成。成品色泽红亮、肥而不腻、入口软糯，是家常菜中最受欢迎的代表之一",
      image:
        "https://res.cloudinary.com/drx9nhsuq/image/upload/v1763399122/cooked-by-us/qwrw3wtwzjloozcvdtla.jpg",
      ingredients: [
        "五花肉 500g",
        "冰糖 20g(或白糖 15g)",
        "生抽 2 汤匙",
        "老抽 1 汤匙",
        "料酒 2 汤匙",
        "姜 6-8片",
        "八角 2个",
        "香叶 2片(可选)",
        "热水 适量",
        "盐 少许",
      ],
      instructions: [
        "五花肉切 2-3cm 块",
        "冷水下锅，放两片姜 + 少许料酒",
        "水开后撇去浮沫，煮 2-3 分钟",
        "捞出用热水冲一下",
        "锅中放少量油(1 小勺即可)",
        "开小火，下冰糖慢慢炒",
        "糖融化并变成 琥珀色 / 茶色 时立即倒入五花肉翻炒",
        "加入：生抽，老抽，料酒，姜片，八角，香叶(可选)，继续翻炒 1 分钟，让肉充分上色、提香",
        "倒入 热水没过肉(必须用热水，否则肉会紧)",
        "小火炖 60-80 分钟",
        "大火收汁到浓稠、肉块油亮即可",
      ],
      cookTime: "PT2H",
      keywords: ["猪肉", "红烧", "软糯", "入口即化"],
    },
    {
      name: "疙瘩汤",
      description:
        "疙瘩汤（也叫嘎达汤）是一道流行于北方地区的传统家常汤食，主要由面疙瘩与蔬菜、鸡蛋等材料煮制而成。它起源朴素，做法简单，以面粉加水拌成小颗粒状的“疙瘩”为核心，再配以番茄、青菜、葱花、鸡蛋等调味食材。成汤后口感软滑、清香开胃，既能当汤喝，也能当简餐吃。由于食材易得、营养均衡、制作灵活，是北方家庭厨房中非常常见的一道温暖实惠的家常菜",
      image:
        "https://res.cloudinary.com/drx9nhsuq/image/upload/v1763461083/cooked-by-us/kdoa0djwggthuzuiotnw.jpg",
      ingredients: [
        "面粉: 100g(约半碗)",
        "清水: 适量(能搅成小絮粒状即可)",
        "西红柿 1个(或番茄酱1勺)",
        "青菜/菠菜/香菜 适量",
        "葱花、姜末 适量",
        "鸡蛋 1个(做蛋花)",
        "盐、胡椒粉、少许生抽",
        "清水或高汤适量",
      ],
      instructions: [
        "面粉放入碗中，加一点点盐",
        "一边用筷子搅拌，一边淋水（水一定要少量多次），搅出小颗粒状的小疙瘩",
        "颗粒越均匀，成汤后口感越好",
        "锅中加油，爆香葱姜",
        "西红柿切块下锅翻炒，炒出汁",
        "加入热水或高汤，煮沸",
        "水开后，将疙瘩分批倒入锅中",
        "边倒边轻轻搅拌，防止粘连",
        "中火煮 3-5 分钟，疙瘩浮起即熟",
        "打入一个鸡蛋，轻轻搅散成蛋花",
        "加盐、生抽调味，胡椒粉提香",
        "放入青菜或香菜叶",
        "再煮 20-30 秒即可关火",
      ],
      cookTime: "",
      keywords: ["汤味清爽", "开胃", "面食"],
    },
  ];

  await RecipeModel.bulkWrite(
    recipes.map((recipe) => ({
      updateOne: {
        filter: { name: recipe.name },
        update: { $setOnInsert: { recipe } },
        upsert: true,
      },
    })),
  );
};
