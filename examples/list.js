const EXAMPLE_LIST = [
  {
    name: '基础开始',
    folder: 'info',
    children: [
      {
        name: '地图模式',
        page: 'map_scene.html',
      },
      {
        name: '三维模式',
        page: 'three_scene.html',
      },
    ],
  },
  {
    name: '地图组件',
    folder: 'widget',
    children: [
      {
        name: '罗盘',
        page: 'compass.html',
      },
      {
        name: '层级控制',
        page: 'zoom_controller.html',
      },
      {
        name: '比例尺',
        page: 'distance_legend.html',
      },
      {
        name: '鹰眼图',
        page: 'hawk_eye_map.html',
      },
      {
        name: '加载蒙层',
        page: 'loading_mask.html',
      },
      {
        name: '右击菜单',
        page: 'contextmenu.html',
      },
      {
        name: '信息框',
        page: 'popup.html',
      },
      {
        name: '提示框',
        page: 'tooltip.html',
      },
    ],
  },
  {
    name: '场景事件',
    folder: 'event',
    children: [
      {
        name: '鼠标事件',
        page: 'mouse_event.html',
      },
    ],
  },
  {
    name: '在线地图',
    folder: 'baseLayer',
    children: [
      {
        name: 'maplibre-矢量',
        page: 'maplibre.html',
      },
      {
        name: '高德地图',
        page: 'amap.html',
      },
      {
        name: 'Arcgis',
        page: 'arcgis.html',
      },
      {
        name: '星图地图',
        page: 'geovis.html',
      },
      {
        name: '谷歌地图',
        page: 'google.html',
      },
      {
        name: '天地图',
        page: 'tdt.html',
      },
    ],
  },
  {
    name: '离线地图',
    folder: 'offline',
    children: [
      {
        name: '蓝色',
        page: 'blue.html',
      },
      {
        name: '夜晚',
        page: 'night.html',
      },
    ],
  },
  {
    name: '地形设置',
    folder: 'terrain',
    children: [
      {
        name: '地形（中国）',
        page: 'ter_ch.html',
      },
      {
        name: '地形（夸张）',
        page: 'ter_exaggeration.html',
      },
    ],
  },
  {
    name: '要素图层',
    folder: 'layer',
    children: [
      {
        name: '矢量图层',
        page: 'vector.html',
      },
      {
        name: '聚合图层',
        page: 'cluster_clustering.html',
      },
      {
        name: 'GeoJson图层',
        page: 'geojson.html',
      },
      {
        name: '3d-tiles图层',
        page: 'tileset.html',
      },
      {
        name: 'I3S图层',
        page: 'i3s.html',
      },
      {
        name: 'DOM图层',
        page: 'dom.html',
      },
    ],
  },
  {
    name: '矢量要素',
    folder: 'vector',
    children: [
      {
        name: '点',
        page: 'point.html',
      },
      {
        name: '图标',
        page: 'billboard.html',
      },
      {
        name: '文本',
        page: 'label.html',
      },
      {
        name: '线',
        page: 'polyline.html',
      },
      {
        name: '虚线',
        page: 'dash_line.html',
      },
      {
        name: '面',
        page: 'polygon.html',
      },
      {
        name: '拉伸体',
        page: 'extrusion.html',
      },
    ],
  },
  {
    name: '网格要素',
    folder: 'mesh',
    children: [],
  },
  {
    name: '模型要素',
    folder: 'model',
    children: [
      {
        name: '模型（矢量）',
        page: 'model_vector.html',
      },
      {
        name: '动画模型（矢量）',
        page: 'model_vector_d.html',
      },
      {
        name: '模型（图元）',
        page: 'model_primitive.html',
      },
      {
        name: '模型动画（图元）',
        page: 'model_primitive_d.html',
      },
      {
        name: '3dtiles-3dmax',
        page: '3dtiles_3dmax.html',
      },
      {
        name: '3dtiles-osgb',
        page: '3dtiles_osgb.html',
      },
      {
        name: '3dtiles-shp',
        page: '3dtiles_shp.html',
      },
      {
        name: '3dtiles-自定shader',
        page: '3dtiles_custom_shader.html',
      },
      {
        name: '3dtiles-样式和自定shader',
        page: '3dtiles_style_and_shader.html',
      },

      { name: 'i3s', page: 'i3s.html' },
    ],
  },
  {
    name: 'DOM要素',
    folder: 'html',
    children: [
      {
        name: 'html点',
        page: 'point_html.html',
      },
    ],
  },
  {
    name: '场景工具',
    folder: 'tools',
    children: [
      {
        name: '标绘',
        page: 'plot.html',
      },
      {
        name: '测量',
        page: 'measure.html',
      },
    ],
  },
  {
    name: '场景动画',
    folder: 'animation',
    children: [
      {
        name: '定点环绕',
        page: 'around_point.html',
      },
      {
        name: '相机环绕',
        page: 'around_view.html',
      },
      {
        name: '定点巡航',
        page: 'flying.html',
      },
      {
        name: '路径漫游',
        page: 'roaming_path.html',
      },
      {
        name: '键盘漫游',
        page: 'roaming_keyboard.html',
      },
      {
        name: '轨迹回放',
        page: 'track.html',
      },
      {
        name: '轨迹回放（事件）',
        page: 'track_event.html',
      },
      {
        name: '轨迹贴地',
        page: 'track_clamp_to_ground.html',
      },
      {
        name: '轨迹贴模型',
        page: 'track_clamp_to_tileset.html',
      },
    ],
  },
  {
    name: '场景效果',
    folder: 'effect',
    children: [
      {
        name: '扫描圆',
        page: 'circle_scan.html',
      },
      {
        name: '雷达扫描',
        page: 'radar_scan.html',
      },
      {
        name: '区域切割',
        page: 'bounds_clip.html',
      },
    ],
  },
  {
    name: 'Turf计算',
    folder: 'turf',
    children: [
      {
        name: '点缓冲',
        page: 'point_buffer.html',
      },
      {
        name: '线缓冲',
        page: 'polyline_buffer.html',
      },
      {
        name: '面缓冲',
        page: 'polygon_buffer.html',
      },
      {
        name: '比例面',
        page: 'polygon_scale.html',
      },
      {
        name: '旋转线',
        page: 'polyline_rotate.html',
      },
      {
        name: '旋转面',
        page: 'polygon_rotate.html',
      },
      {
        name: '扇形面',
        page: 'polygon_sector.html',
      },
    ],
  },
  {
    name: '数据可视化',
    folder: 'datav',
    children: [
      {
        name: '热区图',
        page: 'heat.html',
      },
      {
        name: '热区图(高度)',
        page: 'heat_height.html',
      },
      {
        name: '热区图(建筑)',
        page: 'heat_building.html',
      },
      {
        name: '风场',
        page: 'wind.html',
      },
    ],
  },
  {
    name: 'Echarts',
    folder: 'echarts',
    children: [
      {
        name: 'pm 2.5',
        page: 'pm.html',
      },
      {
        name: '迁徙图',
        page: 'migrate.html',
      },
      {
        name: '航线',
        page: 'airline.html',
      },
      {
        name: '航线（大庆）',
        page: 'plane.html',
      },
      {
        name: '人口迁徙图',
        page: 'population_mobility.html',
      },
      {
        name: '物流图',
        page: 'logistics.html',
      },
    ],
  },
]
