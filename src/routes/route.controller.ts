import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RouteDto } from 'src/routes/dto/incomplete-route.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RouteService } from 'src/routes/route.service';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request} from '@nestjs/common';

@Controller('routes')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @ApiOperation({ summary: 'Create a new route' })
  @Post()
  createRoute(@Body() routeDto: RouteDto, @Body('userId') userId: number) {
    return this.routeService.createRoute(userId, routeDto);
  }

  @ApiOperation({ summary: 'Update an existing route' })
  @Put(':id')
  updateRoute(@Param('id') id: string, @Body() routeDto: RouteDto) {
    return this.routeService.updateRoute(+id, routeDto);
  }

  @ApiOperation({ summary: 'Delete a route' })
  @Delete(':id')
  deleteRoute(@Param('id') id: string) {
    return this.routeService.deleteRoute(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all routes for a user' })
  @Get()
  getUserRoutes(@Request() req) {
    const userId = req.user.userId; // Получаем userId из JWT токена
    return this.routeService.getUserRoutes(userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Add route to favorites' })
  @Post('favorite/:routeId')
  addRouteToFavorites(
    @Request() req,
    @Param('routeId') routeId: string
  ) {
    const userId = req.user.userId; // Получаем userId из JWT токена
    return this.routeService.addRouteToFavorites(userId, +routeId);
  }
}