// import {
//   gameSchema,
//   gameUpdateSchema,
// } from "./../../../../schema/admin/gameSectionSchema";
// import { Router } from "express";
// import { createApiHandler } from "../../../../utils/api-factory";
// import { GameSectionController } from "../../controllers/admin/game.controller";
// import { withFileUpload } from "../../../../utils/file-upload-utils";

// export default (router: Router) => {
//   router.post(
//     "/admin/games",
//     createApiHandler(
//       GameSectionController.createOrUpdateGameSection,
//       withFileUpload(
//         {
//           requireAuth: true,
//           requireAdmin: true,
//           useTransaction: true,
//           bodySchema: gameSchema,
//         },
//         "game-thumbnail",
//         {
//           convertTextToJson: true,
//           validateBeforeAuth: false,
//           pathStructure: "games",
//         }
//       )
//     )
//   );

//   router.get(
//     "/admin/games",
//     createApiHandler(GameSectionController.getAllGames, {
//       useTransaction: true,
//       requireAuth: false,
//     })
//   );

//   router.put(
//     "/admin/games/:id",
//     createApiHandler(
//       GameSectionController.updateGame,
//       withFileUpload(
//         {
//           requireAuth: true,
//           requireAdmin: true,
//           useTransaction: true,
//           bodySchema: gameUpdateSchema,
//         },
//         "game-thumbnail",
//         {
//           convertTextToJson: true,
//           validateBeforeAuth: false,
//           pathStructure: "games",
//         }
//       )
//     )
//   );

//   router.delete(
//     "/admin/games/:id",
//     createApiHandler(GameSectionController.deleteGame, {
//       useTransaction: true,
//       requireAuth: true,
//       requireAdmin: true,
//     })
//   );
// };
