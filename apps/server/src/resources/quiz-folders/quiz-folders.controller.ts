import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { QuizFoldersService } from "./quiz-folders.service";
import {
  ApiDeleteSuccess,
  ApiGetSuccess,
  ApiPatchSuccess,
  ApiPostSuccess,
} from "@/common/decorators/response/api-response-success.decorator";
import { QuizFolderResponseDto } from "./dto/response.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import {
  CreateQuizFolderRequestDto,
  DeleteQuizFolderRequestDto,
  ListQuizFoldersRequestDto,
  UpdateQuizFolderRequestDto,
} from "./dto/request.dto";
import { ApiResponse } from "@/common/dto/response/api-response.dto";
import {
  MemberHasPermission,
  Session,
  type UserSession,
} from "@thallesp/nestjs-better-auth";
import { PERMISSIONS } from "@/lib/auth/permissions";

@Controller("quiz/folders")
@ApiTags("Quiz Folders")
export class QuizFoldersController {
  constructor(private readonly _quizFoldersService: QuizFoldersService) {}

  @Post("/")
  @ApiPostSuccess({
    type: QuizFolderResponseDto,
  })
  @ApiOperation({
    summary: "Create a new quiz folder",
  })
  @MemberHasPermission({
    permissions: {
      quizFolder: [PERMISSIONS.quizFolder.CREATE],
    },
  })
  async create(
    @Body() body: CreateQuizFolderRequestDto,
    @Session() session: UserSession,
  ): Promise<ApiResponse<QuizFolderResponseDto>> {
    const quizFolder = await this._quizFoldersService.create(body, session);
    return new ApiResponse(quizFolder);
  }

  @Get("/")
  @ApiGetSuccess({
    type: QuizFolderResponseDto,
    isArray: true,
  })
  @ApiOperation({
    summary: "List quiz folders, including children count",
  })
  @MemberHasPermission({
    permissions: { quizFolder: [PERMISSIONS.quizFolder.READ] },
  })
  async list(
    @Query() query: ListQuizFoldersRequestDto,
    @Session() session: UserSession,
  ): Promise<ApiResponse<QuizFolderResponseDto[]>> {
    const folders = await this._quizFoldersService.list(query, session);
    return new ApiResponse(folders);
  }

  @Patch("/")
  @ApiPatchSuccess({
    type: QuizFolderResponseDto,
  })
  @ApiOperation({
    summary: "Update a quiz folder",
  })
  @MemberHasPermission({
    permissions: { quizFolder: [PERMISSIONS.quizFolder.UPDATE] },
  })
  async update(
    @Body() body: UpdateQuizFolderRequestDto,
  ): Promise<ApiResponse<QuizFolderResponseDto>> {
    const quizFolder = await this._quizFoldersService.update(body);
    return new ApiResponse(quizFolder);
  }

  @Delete("/")
  @ApiDeleteSuccess({
    description: "Successfully deleted",
  })
  @ApiOperation({
    summary: "Delete a quiz folder",
  })
  @MemberHasPermission({
    permissions: { quizFolder: [PERMISSIONS.quizFolder.DELETE] },
  })
  async delete(
    @Query() query: DeleteQuizFolderRequestDto,
  ): Promise<ApiResponse<void>> {
    const result = await this._quizFoldersService.delete(query);
    return new ApiResponse(result);
  }
}
