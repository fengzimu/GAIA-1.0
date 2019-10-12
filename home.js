// $('.sparkbar').each(function () {
//     var $this = $(this);
//     $this.sparkline('html', {
//     type: 'bar',
//     height: $this.data('height') ? $this.data('height') : '30',
//     barColor: $this.data('color')
//     });
// });

var targetTabIds = ['wfPane','descPane','descPane2','volPane','volPane2','linkPane','linkPane2'];
function showPane(targetId){
    $.each(targetTabIds, function(idx, tid){
    if(targetId === tid){
        $('#' + tid).addClass('content-underline');
    }else{
        $('#' + tid).removeClass('content-underline');
    }
    });
}

var totalContainerIds = ['dashboardContent','chartContainer','employeeChartContainer','projectListContainer','wishListContainer','projectDetailContainer','myProjectsContainer','projectWizard'];

function showMainContent(containerId){
    $.each(totalContainerIds, function(idx, cid){
    if(containerId === cid){
        $('#' + cid).removeClass('hide');
        $('#' + cid).addClass('showDiv');
        if("chartContainer" === containerId){
            showCharts();
        }else if("employeeChartContainer"  === containerId){
            showEmployeeCharts();
        }
    }else{
        $('#' + cid).removeClass('showDiv');
        $('#' + cid).addClass('hide');
    }
    });
}

function addToWishList(){
    $('#headerAction').addClass('hide');

    $('#headerAction2').removeClass('hide');
    $('#headerAction2').addClass('showDiv');
    
    $('#mesDlg').removeClass('hide');
    $('#mesDlg').addClass('showDiv');
    setTimeout(function(){
        $('#mesDlg').removeClass('showDiv');
        $('#mesDlg').addClass('hide');
    },1000);
}

function applyProject(){
    $('#headerAction2').removeClass('showDiv');
    $('#headerAction2').addClass('hide');

    $('#headerAction3').removeClass('hide');
    $('#headerAction3').addClass('showDiv');
    
    $('#mesDlg2').removeClass('hide');
    $('#mesDlg2').addClass('showDiv');
    setTimeout(function(){
        $('#mesDlg2').removeClass('showDiv');
        $('#mesDlg2').addClass('hide');
    },1000);

    setTimeout(function(){
        $('#messFromNGO').removeClass('hide');
        $('#noticeIcon').attr("src","./assets/img/notice-num.jpg");
    },5000);

    setTimeout(function(){
        $('#messFromNGO').addClass('hide');
        $('#noticeIcon').attr("src","./assets/img/notice.jpg");
    },9000);
}

function onJoinProject(){
    $('#headerAction').addClass('hide');
    $('#headerAction2').removeClass('hide');
    $('#headerAction2').addClass('showDiv');
    $('#mesDlg').removeClass('hide');
    $('#mesDlg').addClass('showDiv');
    setTimeout(function(){
        $('#mesDlg').removeClass('showDiv');
        $('#mesDlg').addClass('hide');
    },1000);

    $('#volunteerNum').text('Volunteers(4/30)');
    $('#processNum').text('4/30');
}

function onPressOK(){
    $('#secondStep').addClass('active');
    $('#preferredWrapper').removeClass('hide');
    $('#wizard-header-desc').addClass('recruiting');

    $('#recruit-status').removeClass('status-accept');
    $('#recruit-status').addClass('status-recruiting');
    $('#recruit-status').text('Recruiting');

    $('#recruit-volunteer').removeClass('hide');

    $('#volunteerSection2').removeClass('hide');
    $('#volunteerSection2').addClass('showDiv');

    $('#recruit-project-container').height('1246px');
    $('#recruitButton').text('End Recruiting');
}

function showCharts(){
    var myChart = echarts.init(document.getElementById('main'));
    var categories = [];
    var categoriesname = ["NGO","一级领域","Project","二级领域","UN Category","Place","Enterprise","Topic","Founded",
        "State Organs","Vendor"];
    for (var i = 0; i < categoriesname.length; i++) {
    categories[i] = {
        name: categoriesname[i]
    };
    }
    option = {
    // 图的标题
    title: {
        text: ''
    },
    // 提示框的配置
    tooltip: {
        "formatter": function (arg) {
            var nodeType = arg.data.nodeType,
                srcName = arg.data.name,
                seriesIndex = arg.seriesIndex,
                options = myChart.getOption(),
                serieData = options.series[seriesIndex].data,
                colors = options.color,
                currentData = '',
                tips = '';
                serieData.filter(oData => oData.name === srcName).forEach(oData => currentData=oData);
            var serieSpecificDesc = currentData.des;
            if(serieSpecificDesc != undefined && serieSpecificDesc != "" && serieSpecificDesc.length > 0){
                for (var i = 0; i < serieSpecificDesc.length; i++) {
                    var desc = serieSpecificDesc[i];
                    color = getColor(colors, currentData.category);
                    //set bullets color
                    if(desc.desName != undefined){
                        tips += '<span style="background-color: ' + color + ';width: 10px;height: 10px;border-radius: 50%;display: inline-block"></span> ' 
                        + desc.desName + " : " + desc.desValue + ' <br />';
                    }
                }
            }else{
                tips += currentData.name == undefined ? '' : currentData.name ;
            }
            
            return tips;
        }
    },
    animationDurationUpdate: 300,
    animationEasingUpdate: 'quinticInOut',
    // 工具箱
    toolbox: {
        // 显示工具箱
        show: true,
        feature: {
        mark: {
            show: true
        },
        // 还原
        restore: {
            show: true
        },

        // 保存为图片
        saveAsImage: {
            show: true
        }
        }
    },
    legend: [{
        // selectedMode: 'single',
        data: categories.map(function (a) {
        return a.name;
        })
    }],
    series: [{
        type: 'graph', // 类型:关系图
        layout: 'force', //图的布局，类型为力导图
        symbolSize: 5, // 调整节点的大小
        roam: "move", // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移,可以设置成 'scale' 或者 'move'。设置成 true 为都开启
        edgeSymbol: ['circle', 'arrow'],
        edgeSymbolSize: [2, 7],
        focusNodeAdjacency: true,
        edgeLabel: {
        normal: {
            textStyle: {
            fontSize: 20
            }
        }
        },
        force: {
        repulsion: 130,
        edgeLength: [50, 100]
        },
        draggable: true,
        lineStyle: {
        normal: {
            width: 2,
            color: '#4b565b',
        }
        },
        edgeLabel: {
        normal: {
            show: false,
            formatter: function (x) {
            return x.data.name;
            }
        }
        },
        lineStyle: {
        normal: {
            width: 0.5,
            // curveness: 0.3,
            opacity: 0.7
        }
        },
        label: {
        normal: {
            show: false,
            position: 'right',
            textStyle: {}
        }
        },

        // 数据
        data: [
        {
            "name": "中外合作研究课题“强化中国市场竞争：国际视角的思考与建议”",
            "des": "中外合作研究课题”强化中国市场竞争：国际视角的思考与建议”",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0
        },
        //NGOs
        {
            "name": "China Children and Teenagers'Fund",
            "des": [
            {
                desName : "Name",
                desValue: "China Children and Teenagers'Fund"
            },
            {
                desName : "Score",
                desValue: "86.1369（Excellent)"
            },
            {
                desName : "Transparency Index",
                desValue: "16.25(Excellent)"
            },
            {
                desName : "Capability Index",
                desValue: "22.42(Excellent)"
            },
            {
                desName : "Partners Index",
                desValue: "19.6415(Excellent)"
            },
            {
                desName : "Hazard Index",
                desValue: "13.75(Excellent)"
            },
            {
                desName : "Brand Index",
                desValue: "14.0754(Excellent)"
            }
            ],
            "symbolSize": 15,
            "category": 0,
            "nodeType": 2,
            label: {
                normal: {
                  show: true
                }
            }
        },
        {
            "name": "乔治全球健康研究院",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 1
        },
        {
            "name": "All-China Women's Federation",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 2,
            label: {
                normal: {
                  show: true
                }
          }
        },
        {
            "name": "北京科学教育发展基金会",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0
        },
        {
            "name": "北京科技大学教育发展基金会",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0
        },
        {
            "name": "中国教育发展基金会",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0
        },
        {
            "name": "Beijing阳光保险爱心基金会",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0
        },
        {
            "name": "安徽师范大学教育基金会",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0
        },
        {
            "name": "宁波市鄞州区人民教育基金会",
            "des": "",
            "symbolSize": 15,
            "category":0,
            "nodeType": 0
        },
        //Projects
        {
            "name": "Spring Buds Project",
            "des": [
                {
                    desName : "Initiative",
                    desValue: "Good"
                },
                {
                    desName : "Social Impact",
                    desValue: "Excellent"
                },
                {
                    desName : "People Engagement",
                    desValue: "Excellent"
                },
                {
                    desName : "Satisfaction",
                    desValue: "Excellent"
                },
                {
                    desName : "Recommendation",
                    desValue: "High"
                }
            ],
            "symbolSize": 15,
            "category": 2,
            "nodeType": 0,
            label: {
                normal: {
                  show: true
                }
            }
        },
        {
            "name": "Inclusion with Intellectual and Developmental Disabilities through Happy Sport Camp",
            "des": "",
            "symbolSize": 15,
            "category": 2,
            "nodeType": 0
        },
        {
            "name": "Design Thinking Volunteers for UNDP National Dialogue China 2019",
            "des": "",
            "symbolSize": 15,
            "category": 2,
            "nodeType": 0
        },
        {
            "name": "Help Rural Children Out of Poverty Through Cloud Teaching",
            "des": "",
            "symbolSize": 15,
            "category": 2,
            "nodeType": 0
        },
        {
            "name": "Helping migrant children appreciate architect culture at the Palace Museum",
            "des": "",
            "symbolSize": 15,
            "category": 2,
            "nodeType": 0
        },
        {
            "name": "DT workshop for Narada Foundation in BJ",
            "des": "",
            "symbolSize": 15,
            "category": 2,
            "nodeType": 0
        },
        {
            "name": "NGO 2.0 Hackathon",
            "des": "",
            "symbolSize": 15,
            "category": 2,
            "nodeType": 0
        },
        {
            "name": "watch the National Palace Museum art appreciation",
            "des": "",
            "symbolSize": 15,
            "category": 2,
            "nodeType": 0
        },
        {
            "name": "RUN WITH LOVE 2019 - World Hemophilia Day",
            "des": "",
            "symbolSize": 15,
            "category": 2,
            "nodeType": 0
        },
        {
            "name": "UN Women SHE CAN digital empowerment to women entrepreneurs in Guangzhou June 18-19",
            "des": "",
            "symbolSize": 15,
            "category": 2,
            "nodeType": 0
        },
        {
            "name": "Cloud Teaching",
            "des": "",
            "symbolSize": 15,
            "category":2,
            "nodeType": 0
        },
        {
            "name": "Children' Happy Home",
            "des": "",
            "symbolSize": 15,
            "category": 8,
            "nodeType": 0,
            label: {
                normal: {
                  show: true
                }
          }
        },
        {
            "name": "HELLO Kids",
            "des": "",
            "symbolSize": 15,
            "category": 8,
            "nodeType": 0,
            label: {
                normal: {
                  show: true
                }
            }
        },
        {
            "name": "移动心健康",
            "des": "",
            "symbolSize": 15,
            "category": 8,
            "nodeType": 0
        },
        {
            "name": "无线关爱",
            "des": "",
            "symbolSize": 15,
            "category": 8,
            "nodeType": 0
        },
        {
            "name": "教育信息化应用研究与开发",
            "des": "",
            "symbolSize": 15,
            "category": 8,
            "nodeType": 0
        },
        {
            "name": "北京科技大学教育事业发展Project",
            "des": "",
            "symbolSize": 15,
            "category": 8,
            "nodeType": 0
        },
        {
            "name": "基于云平台的三维创意课程与实践基地建设",
            "des": "",
            "symbolSize": 15,
            "category": 8,
            "nodeType": 0
        },
        {
            "name": "百度数字魔方专项",
            "des": "",
            "symbolSize": 15,
            "category": 10,
            "nodeType": 0
        },
        {
            "name": "“阳光互联网金融创新研究中心”Project",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0
        },
        {
            "name": "微一BBQ幼儿园教育信息化平台资助Project",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0
        },
        {
            "name": "丽晶电子助教",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0
        },
        {
            "name": "中小学智慧创意教室云服务平台建设",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0
        },
        //Enterprises
        {
            "name": "Evergrande Real Estate Group",
            "des": "",
            "symbolSize": 15,
            "category": 7,
            "nodeType": 0,
            label: {
                normal: {
                  show: true
                }
          }
        },
        {
            "name": "Company A",
            "des": "",
            "symbolSize": 15,
            "category": 7,
            "nodeType": 0,
            label: {
                normal: {
                  show: true
                }
          }
        },
        {
            "name": "Accenture",
            "des": "",
            "symbolSize": 15,
            "category": 7,
            "nodeType": 0,
            label: {
                normal: {
                  show: true
                }
          }
        },
        {
            "name": "PWC",
            "des": "",
            "symbolSize": 15,
            "category": 7,
            "nodeType": 0,
            label: {
                normal: {
                  show: true
                }
          }
        },
        {
            "name": "Aucma health care",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0,
            label: {
                normal: {
                  show: true
                }
          }
        },
        {
            "name": "高通",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0
        },
        {
            "name": "中卫莱康",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0
        },
        {
            "name": "Vital Wave",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0
        },
        {
            "name": "百度",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0
        },
        {
            "name": "阳光产险",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0
        },
        //Topics
        {
            "name": "Education",
            "des": "",
            "symbolSize": 15,
            "category": 8,
            "nodeType": 0,
            label: {
                normal: {
                  show: true
                }
          }
        },
        {
            "name": "Children",
            "des": "",
            "symbolSize": 15,
            "category": 8,
            "nodeType": 0,
            label: {
                normal: {
                  show: true
                }
          }
        },
        {
            "name": "Female",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0,
            label: {
                normal: {
                  show: true
                }
          }
        },
        {
            "name": "信息化",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0
        },
        //Medias
        {
            "name": "CHINA NATIONAL RADIO",
            "des": "",
            "symbolSize": 15,
            "category": 11,
            "nodeType": 0,
            label: {
                normal: {
                  show: true
                }
          }
        },
        {
            "name": "HTC",
            "des": "",
            "symbolSize": 15,
            "category": 12,
            "nodeType": 0,
            label: {
                normal: {
                  show: true
                }
          }
        },
        {
            "name": "健康",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0
        },
        {
            "name": "Maternal Development Platform for the 1000 - day plan",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0
        },
        {
            "name": "刘光鼎地球物理奖学金",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0
        },
        {
            "name": "宋庆龄基金会Education金",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0
        },
        {
            "name": "“爱心成就未来”Education金",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0
        },
        {
            "name": "植物医生德育Education金",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0
        },
        {
            "name": "图书馆“服务之星”奖励",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0
        },
        {
            "name": "宝供物流奖学金",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0
        },
        {
            "name": "特殊教育资助活动",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0
        },
        {
            "name": "基金会成长基金",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0
        },
        {
            "name": "曹光彪奖励",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0
        },
        {
            "name": "教科研推广",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0
        },
        {
            "name": "60002801徐金生蔡玉霞伉俪励志助奖学金Project（资助中心）",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0
        },
        {
            "name": "500107中外公益慈善交流与合作基金（公益研院）",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0
        },
        {
            "name": "“钟香驹”奖学金",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0
        },
        {
            "name": "20003602京师高铭暄学术活动基金",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0
        },
        {
            "name": "退休校级领导沙龙活动",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0
        },
        {
            "name": "300025人文宗教高等研究院基金",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0
        },
        {
            "name": "上海学习科研研究所",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0
        },
        {
            "name": "健身康乐行",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0
        },
        {
            "name": "上钢公益社区专项基金",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0
        },
        {
            "name": "梅特勒-托利多奖学金",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0
        },
        {
            "name": "上海永利带业股份有限公司捐赠",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0
        },
        {
            "name": "重大疾病帮扶",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0
        },
        {
            "name": "仁德醒来基金",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0
        },
        {
            "name": "卡西欧",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0
        },
        {
            "name": "其他公益活动",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0
        },
        {
            "name": "1000980003华民慈善基金会大学生就业扶助Project",
            "des": "",
            "symbolSize": 15,
            "category": 0,
            "nodeType": 0
        },
        {
            "name": "北京凯恩克劳斯经济研究基金会",
            "des": "",
            "symbolSize": 15,
            "category": 1,
            "nodeType": 1
        },
        {
            "name": "Beijing刘光鼎地球物理科学基金会",
            "des": "",
            "symbolSize": 15,
            "category": 1,
            "nodeType": 1
        },
        {
            "name": "北京工商大学教育基金会",
            "des": "",
            "symbolSize": 15,
            "category": 1,
            "nodeType": 1
        },
        {
            "name": "上海市黄浦区教育基金会",
            "des": "",
            "symbolSize": 15,
            "category": 1,
            "nodeType": 1
        },
        {
            "name": "上海华东理工大学教育发展基金会",
            "des": "",
            "symbolSize": 15,
            "category": 1,
            "nodeType": 1
        },
        {
            "name": "北京师范大学教育基金会",
            "des": "",
            "symbolSize": 15,
            "category": 1,
            "nodeType": 1
        },
        {
            "name": "上海仁德基金会",
            "des": "",
            "symbolSize": 15,
            "category": 1,
            "nodeType": 1
        },
        {
            "name": "上海复大公益基金会",
            "des": "",
            "symbolSize": 15,
            "category": 1,
            "nodeType": 1
        },
        {
            "name": "上海外国语大学教育发展基金会",
            "des": "",
            "symbolSize": 15,
            "category": 1,
            "nodeType": 1
        },
        {
            "name": "广州市小星辰儿童成长基金会",
            "des": "",
            "symbolSize": 15,
            "category": 1,
            "nodeType": 1
        },
        {
            "name": "教育",
            "des": "",
            "symbolSize": 15,
            "category": 2,
            "nodeType": 2
        },
        {
            "name": "扶贫助困",
            "des": "",
            "symbolSize": 15,
            "category": 2,
            "nodeType": 2
        },
        {
            "name": "医疗救助",
            "des": "",
            "symbolSize": 15,
            "category": 2,
            "nodeType": 2
        },
        {
            "name": "科学研究",
            "des": "",
            "symbolSize": 15,
            "category": 2,
            "nodeType": 2
        },
        {
            "name": "公共安全",
            "des": "",
            "symbolSize": 15,
            "category": 2,
            "nodeType": 2
        },
        {
            "name": "志愿服务",
            "des": "",
            "symbolSize": 15,
            "category": 2,
            "nodeType": 2
        },
        {
            "name": "公益事业发展",
            "des": "",
            "symbolSize": 15,
            "category": 2,
            "nodeType": 2
        },
        {
            "name": "创业就业",
            "des": "",
            "symbolSize": 15,
            "category": 2,
            "nodeType": 2
        },
        {
            "name": "机构发展",
            "des": "",
            "symbolSize": 15,
            "category": 3,
            "nodeType": 3
        },
        {
            "name": "扶贫助困服务",
            "des": "",
            "symbolSize": 15,
            "category": 3,
            "nodeType": 3
        },
        {
            "name": "就业服务",
            "des": "",
            "symbolSize": 15,
            "category": 3,
            "nodeType": 3
        },
        {
            "name": "校园建设",
            "des": "",
            "symbolSize": 15,
            "category": 3,
            "nodeType": 3
        },
        {
            "name": "Education/奖学金",
            "des": "",
            "symbolSize": 15,
            "category": 3,
            "nodeType": 3
        },
        {
            "name": "教育服务",
            "des": "",
            "symbolSize": 15,
            "category": 3,
            "nodeType": 3
        },
        {
            "name": "社会科学",
            "des": "",
            "symbolSize": 15,
            "category": 3,
            "nodeType": 3
        },
        {
            "name": "志愿活动支持",
            "des": "",
            "symbolSize": 15,
            "category": 3,
            "nodeType": 3
        },
        {
            "name": "基金会",
            "des": "",
            "symbolSize": 15,
            "category": 4,
            "nodeType": 4
        },
        {
            "name": "研究生及以上",
            "des": "",
            "symbolSize": 15,
            "category": 4,
            "nodeType": 4
        },
        {
            "name": "小学",
            "des": "",
            "symbolSize": 15,
            "category": 4,
            "nodeType": 4
        },
        {
            "name": "教师资助",
            "des": "",
            "symbolSize": 15,
            "category": 4,
            "nodeType": 4
        },
        {
            "name": "公益NGO",
            "des": "",
            "symbolSize": 15,
            "category": 4,
            "nodeType": 4
        },
        {
            "name": "白血病",
            "des": "",
            "symbolSize": 15,
            "category": 4,
            "nodeType": 4
        },
        {
            "name": "活动支持",
            "des": "",
            "symbolSize": 15,
            "category": 4,
            "nodeType": 4
        },
        {
            "name": "教学发展",
            "des": "",
            "symbolSize": 15,
            "category": 4,
            "nodeType": 4
        },
        {
            "name": "大学",
            "des": "",
            "symbolSize": 15,
            "category": 4,
            "nodeType": 4
        },
        {
            "name": "特殊教育",
            "des": "",
            "symbolSize": 15,
            "category": 4,
            "nodeType": 4
        },
        {
            "name": "重大疾病",
            "des": "",
            "symbolSize": 15,
            "category": 4,
            "nodeType": 4
        },
        {
            "name": "技能培训",
            "des": "",
            "symbolSize": 15,
            "category": 4,
            "nodeType": 4
        },
        {
            "name": "资金支持",
            "des": "",
            "symbolSize": 15,
            "category": 4,
            "nodeType": 4
        },
        {
            "name": "其他",
            "des": "",
            "symbolSize": 15,
            "category": 5,
            "nodeType": 5
        },
        //Themes
        {
            "name": "体面工作和经济增长",
            "des": "",
            "symbolSize": 15,
            "category": 5,
            "nodeType": 5
        },
        {
            "name": "可持续城市和社区",
            "des": "",
            "symbolSize": 15,
            "category": 5,
            "nodeType": 5
        },
        {
            "name": "良好健康与福祉",
            "des": "",
            "symbolSize": 15,
            "category": 5,
            "nodeType": 5
        },
        {
            "name": "减少不平等",
            "des": "",
            "symbolSize": 15,
            "category": 5,
            "nodeType": 5
        },
        {
            "name": "Quality Education",
            "des": "",
            "symbolSize": 15,
            "category": 5,
            "nodeType": 5
        },
        {
            "name": "No Poverty",
            "des": "",
            "symbolSize": 15,
            "category": 5,
            "nodeType": 5
        },
        {
            "name": "促进目标实现的伙伴关系",
            "des": "",
            "symbolSize": 15,
            "category": 5,
            "nodeType": 5
        },
        {
            "name": "性别平等",
            "des": "",
            "symbolSize": 15,
            "category": 5,
            "nodeType": 5
        },
        // places
        {
            "name": "Beijing",
            "des": "",
            "symbolSize": 15,
            "category": 6,
            "nodeType": 6,
            label: {
                normal: {
                  show: true
                }
          }
        },
        {
            "name": "Dalian",
            "des": "",
            "symbolSize": 15,
            "category": 6,
            "nodeType": 6
        },
        {
            "name": "Chengdu",
            "des": "",
            "symbolSize": 15,
            "category": 6,
            "nodeType": 6
        },
        {
            "name": "Guangzhou",
            "des": "",
            "symbolSize": 15,
            "category": 6,
            "nodeType": 6
        },
        {
            "name": "Shanghai",
            "des": "",
            "symbolSize": 15,
            "category": 6,
            "nodeType": 6
        },
        {
            "name": "2007-01-30",
            "des": "Founded",
            "symbolSize": 15,
            "category": 7,
            "nodeType": 8
        },
        {
            "name": "Beijing Normal University Education Foundation",
            "des": "",
            "symbolSize": 15,
            "category": 8,
            "nodeType": 9
        },
        {
            "name": " 527,984,343.18",
            "des": "",
            "symbolSize": 15,
            "category": 9,
            "nodeType": 10
        },
        {
            "name": "2011-10-08",
            "des": "Founded",
            "symbolSize": 15,
            "category": 7,
            "nodeType": 8
        },
        {
            "name": "Shanghai East China University of Science and Technology Education Development Foundation",
            "des": "",
            "symbolSize": 15,
            "category": 8,
            "nodeType": 9
        },
        {
            "name": " 18,592,230.92",
            "des": "",
            "symbolSize": 15,
            "category": 9,
            "nodeType": 10
        },
        {
            "name": "2009-12-17",
            "des": "Founded",
            "symbolSize": 15,
            "category": 7,
            "nodeType": 8
        },
        {
            "name": "Shanghai International Studies University Education Development Foundation",
            "des": "",
            "symbolSize": 15,
            "category": 8,
            "nodeType": 9
        },
        {
            "name": " 14,649,197.26",
            "des": "",
            "symbolSize": 15,
            "category": 9,
            "nodeType": 10
        },
        {
            "name": "2011-12-07",
            "des": "Founded",
            "symbolSize": 15,
            "category": 7,
            "nodeType": 8
        },
        {
            "name": "Shanghai Rende Foundation",
            "des": "",
            "symbolSize": 15,
            "category": 8,
            "nodeType": 9
        },
        {
            "name": " 7,400,084.01",
            "des": "",
            "symbolSize": 15,
            "category": 9,
            "nodeType": 10
        },
        {
            "name": "2007-11-07",
            "des": "Founded",
            "symbolSize": 15,
            "category": 7,
            "nodeType": 8
        },
        {
            "name": "Cairncross Economic Research Foundation",
            "des": "",
            "symbolSize": 15,
            "category": 8,
            "nodeType": 9
        },
        {
            "name": " 9,836,874.26",
            "des": "",
            "symbolSize": 15,
            "category": 9,
            "nodeType": 10
        },
        {
            "name": "2009-12-03",
            "des": "Founded",
            "symbolSize": 15,
            "category": 7,
            "nodeType": 8
        },
        {
            "name": "Beijing Technology and Business University Education Foundation",
            "des": "",
            "symbolSize": 15,
            "category": 8,
            "nodeType": 9
        },
        {
            "name": " 4,378,230.82",
            "des": "",
            "symbolSize": 15,
            "category": 9,
            "nodeType": 10
        },
        {
            "name": "2007-03-28",
            "des": "Founded",
            "symbolSize": 15,
            "category": 7,
            "nodeType": 8
        },
        {
            "name": "Beijing Liuguangding Physical Geography Science Foundation",
            "des": "",
            "symbolSize": 15,
            "category": 8,
            "nodeType": 9
        },
        {
            "name": " 1,835,964.97",
            "des": "",
            "symbolSize": 15,
            "category": 9,
            "nodeType": 10
        },
        {
            "name": "2011-06-10",
            "des": "Founded",
            "symbolSize": 15,
            "category": 7,
            "nodeType": 8
        },
        {
            "name": "Shanghai Fuda Foundation",
            "des": "",
            "symbolSize": 15,
            "category": 8,
            "nodeType": 9
        },
        {
            "name": " 6,433,381.14",
            "des": "",
            "symbolSize": 15,
            "category": 9,
            "nodeType": 10
        },
        {
            "name": "1992-05-28",
            "des": "Founded",
            "symbolSize": 15,
            "category": 7,
            "nodeType": 8
        },
        {
            "name": "Shanghai Huangpu Education Foundation",
            "des": "",
            "symbolSize": 15,
            "category": 8,
            "nodeType": 9
        },
        {
            "name": " 68,718,635.67",
            "des": "",
            "symbolSize": 15,
            "category": 9,
            "nodeType": 10
        }],
        links: [
        {
            "source": "China Children and Teenagers'Fund",
            "target": "Spring Buds Project",
            "des": "Project"
        },
        {
            "source": "China Children and Teenagers'Fund",
            "target": "Cloud Teaching",
            "des": "Project"
        },
        {
            "source": "Spring Buds Project",
            "target": "Accenture",
            "des": "合作公司"
        },
        {
            "source": "Spring Buds Project",
            "target": "PWC",
            "des": "合作公司"
        },
        {
            "source": "Company A",
            "target": "Inclusion with Intellectual and Developmental Disabilities through Happy Sport Camp",
            "des": "Project"
        },
        {
            "source": "Company A",
            "target": "Design Thinking Volunteers for UNDP National Dialogue China 2019",
            "des": "Project"
        },
        {
            "source": "Company A",
            "target": "Help Rural Children Out of Poverty Through Cloud Teaching",
            "des": "Project"
        },
        {
            "source": "Company A",
            "target": "Helping migrant children appreciate architect culture at the Palace Museum",
            "des": "Project"
        },
        {
            "source": "Company A",
            "target": "DT workshop for Narada Foundation in BJ",
            "des": "Project"
        },
        {
            "source": "Company A",
            "target": "NGO 2.0 Hackathon",
            "des": "Project"
        },
        {
            "source": "Company A",
            "target": "watch the National Palace Museum art appreciation",
            "des": "Project"
        },
        {
            "source": "Company A",
            "target": "Helping migrant children appreciate ART in July",
            "des": "Project"
        },
        {
            "source": "Company A",
            "target": "RUN WITH LOVE 2019 - World Hemophilia Day",
            "des": "Project"
        },
        {
            "source": "Company A",
            "target": "UN Women SHE CAN digital empowerment to women entrepreneurs in Guangzhou June 18-19",
            "des": "Project"
        },
        {
            "source": "Inclusion with Intellectual and Developmental Disabilities through Happy Sport Camp",
            "target": "Beijing",
            "des": "Place"
        },
        {
            "source": "Inclusion with Intellectual and Developmental Disabilities through Happy Sport Camp",
            "target": "Shanghai",
            "des": "Place"
        },
        {
            "source": "Inclusion with Intellectual and Developmental Disabilities through Happy Sport Camp",
            "target": "Dalian",
            "des": "Place"
        },
        {
            "source": "Design Thinking Volunteers for UNDP National Dialogue China 2019",
            "target": "Beijing",
            "des": "Place"
        },
        {
            "source": "Design Thinking Volunteers for UNDP National Dialogue China 2019",
            "target": "Quality Education",
            "des": "UN Category"
        },
        {
            "source": "Help Rural Children Out of Poverty Through Cloud Teaching",
            "target": "Beijing",
            "des": "Place"
        },
        {
            "source": "Help Rural Children Out of Poverty Through Cloud Teaching",
            "target": "Shanghai",
            "des": "Place"
        },
        {
            "source": "Help Rural Children Out of Poverty Through Cloud Teaching",
            "target": "Dalian",
            "des": "Place"
        },
        {
            "source": "Help Rural Children Out of Poverty Through Cloud Teaching",
            "target": "Chengdu",
            "des": "Place"
        },
        {
            "source": "Help Rural Children Out of Poverty Through Cloud Teaching",
            "target": "No Poverty",
            "des": "UN Category"
        },
        {
            "source": "Help Rural Children Out of Poverty Through Cloud Teaching",
            "target": "Quality Education",
            "des": "UN Category"
        },
        {
            "source": "Helping migrant children appreciate architect culture at the Palace Museum",
            "target": "Beijing",
            "des": "Place"
        },
        {
            "source": "Helping migrant children appreciate architect culture at the Palace Museum",
            "target": "Quality Education",
            "des": "UN Category"
        },
        {
            "source": "DT workshop for Narada Foundation in BJ",
            "target": "Quality Education",
            "des": "UN Category"
        },
        {
            "source": "DT workshop for Narada Foundation in BJ",
            "target": "Beijing",
            "des": "Place"
        },
        {
            "source": "watch the National Palace Museum art appreciation",
            "target": "Quality Education",
            "des": "UN Category"
        },
        {
            "source": "watch the National Palace Museum art appreciation",
            "target": "Beijing",
            "des": "Place"
        },
        {
            "source": "Helping migrant children appreciate ART in July",
            "target": "Beijing",
            "des": "Place"
        },
        {
            "source": "UN Women SHE CAN digital empowerment to women entrepreneurs in Guangzhou June 18-19",
            "target": "Guangzhou",
            "des": "Place"
        },
        {
            "source": "Cloud Teaching",
            "target": "Company A",
            "des": "合作公司"
        },
        {
            "source": "China Children and Teenagers'Fund",
            "target": "Children' Happy Home",
            "des": "Project"
        },
        {
            "source": "China Children and Teenagers'Fund",
            "target": "HELLO Kids",
            "des": "Project"
        },
        {
            "source": "China Children and Teenagers'Fund",
            "target": "Maternal Development Platform for the 1000 - day plan",
            "des": "Project"
        },
        {
            "source": "Spring Buds Project",
            "target": "Children",
            "des": "Topic"
        },
        {
            "source": "Spring Buds Project",
            "target": "Education",
            "des": "Topic"
        },
        {
            "source": "Spring Buds Project",
            "target": "Female",
            "des": "Topic"
        },
        {
            "source": "Spring Buds Project",
            "target": "Beijing",
            "des": "Place"
        },
        {
            "source": "Spring Buds Project",
            "target": "All-China Women's Federation",
            "des": "NGO"
        },
        {
            "source": "Spring Buds Project",
            "target": "Evergrande Real Estate Group",
            "des": "Enterprise"
        },
        {
            "source": "Spring Buds Project",
            "target": "Aucma health care",
            "des": "Enterprise"
        },
        {
            "source": "Spring Buds Project",
            "target": "CHINA NATIONAL RADIO",
            "des": "State Organs"
        },
        {
            "source": "Spring Buds Project",
            "target": "HTC",
            "des": "Vendor"
        },
        {
            "source": "Maternal Development Platform for the 1000 - day plan",
            "target": "Female",
            "des": "Topic"
        },
        {
            "source": "Maternal Development Platform for the 1000 - day plan",
            "target": "信息化",
            "des": "Topic"
        },
        {
            "source": "Maternal Development Platform for the 1000 - day plan",
            "target": "乔治全球健康研究院",
            "des": "NGO"
        },
        {
            "source": "Maternal Development Platform for the 1000 - day plan",
            "target": "高通",
            "des": "Enterprise"
        },
        {
            "source": "高通",
            "target": "移动心健康",
            "des": "Project"
        },
        {
            "source": "高通",
            "target": "无线关爱",
            "des": "Project"
        },
        {
            "source": "移动心健康",
            "target": "健康",
            "des": "Topic"
        },
        {
            "source": "移动心健康",
            "target": "信息化",
            "des": "Topic"
        },
        {
            "source": "移动心健康",
            "target": "中卫莱康",
            "des": "Enterprise"
        },
        {
            "source": "移动心健康",
            "target": "Vital Wave",
            "des": "Enterprise"
        },
        {
            "source": "无线关爱",
            "target": "教育",
            "des": "Topic"
        },
        {
            "source": "无线关爱",
            "target": "信息化",
            "des": "Topic"
        },
        {
            "source": "信息化",
            "target": "教育信息化应用研究与开发",
            "des": "Project"
        },
        {
            "source": "信息化",
            "target": "北京科技大学教育事业发展Project",
            "des": "Project"
        },
        {
            "source": "信息化",
            "target": "基于云平台的三维创意课程与实践基地建设",
            "des": "Project"
        },
        {
            "source": "信息化",
            "target": "百度数字魔方专项",
            "des": "Project"
        },
        {
            "source": "信息化",
            "target": "“阳光互联网金融创新研究中心”Project",
            "des": "Project"
        },
        {
            "source": "信息化",
            "target": "微一BBQ幼儿园教育信息化平台资助Project",
            "des": "Project"
        },
        {
            "source": "信息化",
            "target": "丽晶电子助教",
            "des": "Project"
        },
        {
            "source": "信息化",
            "target": "中小学智慧创意教室云服务平台建设",
            "des": "Project"
        },
        {
            "source": "教育",
            "target": "教育信息化应用研究与开发",
            "des": "Project"
        },
        {
            "source": "教育",
            "target": "北京科技大学教育事业发展Project",
            "des": "Project"
        },
        {
            "source": "教育",
            "target": "基于云平台的三维创意课程与实践基地建设",
            "des": "Project"
        },
        {
            "source": "教育",
            "target": "百度数字魔方专项",
            "des": "Project"
        },
        {
            "source": "教育",
            "target": "“阳光互联网金融创新研究中心”Project",
            "des": "Project"
        },
        {
            "source": "教育",
            "target": "微一BBQ幼儿园教育信息化平台资助Project",
            "des": "Project"
        },
        {
            "source": "教育",
            "target": "丽晶电子助教",
            "des": "Project"
        },
        {
            "source": "教育",
            "target": "中小学智慧创意教室云服务平台建设",
            "des": "Project"
        },
        {
            "source": "教育信息化应用研究与开发",
            "target": "北京科学教育发展基金会",
            "des": "NGO"
        },
        {
            "source": "北京科技大学教育事业发展Project",
            "target": "北京科技大学教育发展基金会",
            "des": "NGO"
        },
        {
            "source": "基于云平台的三维创意课程与实践基地建设",
            "target": "北京科学教育发展基金会",
            "des": "NGO"
        },
        {
            "source": "百度数字魔方专项",
            "target": "中国教育发展基金会",
            "des": "NGO"
        },
        {
            "source": "“阳光互联网金融创新研究中心”Project",
            "target": "Beijing阳光保险爱心基金会",
            "des": "NGO"
        },
        {
            "source": "微一BBQ幼儿园教育信息化平台资助Project",
            "target": "安徽师范大学教育基金会",
            "des": "NGO"
        },
        {
            "source": "丽晶电子助教",
            "target": "宁波市鄞州区人民教育基金会",
            "des": "NGO"
        },
        {
            "source": "中小学智慧创意教室云服务平台建设",
            "target": "北京科学教育发展基金会",
            "des": "NGO"
        },
        {
            "source": "百度数字魔方专项",
            "target": "百度",
            "des": "Enterprise"
        },
        {
            "source": "“阳光互联网金融创新研究中心”Project",
            "target": "阳光产险",
            "des": "Enterprise"
        },
        {
            "source": "中外合作研究课题“强化中国市场竞争：国际视角的思考与建议”",
            "target": "北京凯恩克劳斯经济研究基金会",
            "des": "NGO"
        },
        {
            "source": "中外合作研究课题“强化中国市场竞争：国际视角的思考与建议”",
            "target": "科学研究",
            "des": "一级领域"
        },
        {
            "source": "中外合作研究课题“强化中国市场竞争：国际视角的思考与建议”",
            "target": "社会科学",
            "des": "二级领域"
        },
        {
            "source": "中外合作研究课题“强化中国市场竞争：国际视角的思考与建议”",
            "target": "社会科学",
            "des": "二级领域"
        },
        {
            "source": "中外合作研究课题“强化中国市场竞争：国际视角的思考与建议”",
            "target": "其他",
            "des": "UN Category"
        },
        {
            "source": "中外合作研究课题“强化中国市场竞争：国际视角的思考与建议”",
            "target": "Beijing",
            "des": "Place"
        },
        {
            "source": "中外合作研究课题“强化中国市场竞争：国际视角的思考与建议”",
            "target": "北京凯恩克劳斯经济研究基金会",
            "des": "NGO"
        },
        {
            "source": "中外合作研究课题“强化中国市场竞争：国际视角的思考与建议”",
            "target": "科学研究",
            "des": "一级领域"
        },
        {
            "source": "中外合作研究课题“强化中国市场竞争：国际视角的思考与建议”",
            "target": "社会科学",
            "des": "二级领域"
        },
        {
            "source": "中外合作研究课题“强化中国市场竞争：国际视角的思考与建议”",
            "target": "社会科学",
            "des": "二级领域"
        },
        {
            "source": "中外合作研究课题“强化中国市场竞争：国际视角的思考与建议”",
            "target": "促进目标实现的伙伴关系",
            "des": "UN Category"
        },
        {
            "source": "中外合作研究课题“强化中国市场竞争：国际视角的思考与建议”",
            "target": "Beijing",
            "des": "Place"
        },
        {
            "source": "刘光鼎地球物理奖学金",
            "target": "Beijing刘光鼎地球物理科学基金会",
            "des": "NGO"
        },
        {
            "source": "刘光鼎地球物理奖学金",
            "target": "教育",
            "des": "一级领域"
        },
        {
            "source": "刘光鼎地球物理奖学金",
            "target": "Education/奖学金",
            "des": "二级领域"
        },
        {
            "source": "刘光鼎地球物理奖学金",
            "target": "大学",
            "des": "二级领域"
        },
        {
            "source": "刘光鼎地球物理奖学金",
            "target": "Quality Education",
            "des": "UN Category"
        },
        {
            "source": "刘光鼎地球物理奖学金",
            "target": "Beijing",
            "des": "Place"
        },
        {
            "source": "宋庆龄基金会Education金",
            "target": "北京工商大学教育基金会",
            "des": "NGO"
        },
        {
            "source": "宋庆龄基金会Education金",
            "target": "教育",
            "des": "一级领域"
        },
        {
            "source": "宋庆龄基金会Education金",
            "target": "Education/奖学金",
            "des": "二级领域"
        },
        {
            "source": "宋庆龄基金会Education金",
            "target": "大学",
            "des": "二级领域"
        },
        {
            "source": "宋庆龄基金会Education金",
            "target": "Quality Education",
            "des": "UN Category"
        },
        {
            "source": "宋庆龄基金会Education金",
            "target": "Beijing",
            "des": "Place"
        },
        {
            "source": "“爱心成就未来”Education金",
            "target": "北京工商大学教育基金会",
            "des": "NGO"
        },
        {
            "source": "“爱心成就未来”Education金",
            "target": "教育",
            "des": "一级领域"
        },
        {
            "source": "“爱心成就未来”Education金",
            "target": "Education/奖学金",
            "des": "二级领域"
        },
        {
            "source": "“爱心成就未来”Education金",
            "target": "研究生及以上",
            "des": "二级领域"
        },
        {
            "source": "“爱心成就未来”Education金",
            "target": "Quality Education",
            "des": "UN Category"
        },
        {
            "source": "“爱心成就未来”Education金",
            "target": "Beijing",
            "des": "Place"
        },
        {
            "source": "植物医生德育Education金",
            "target": "北京工商大学教育基金会",
            "des": "NGO"
        },
        {
            "source": "植物医生德育Education金",
            "target": "教育",
            "des": "一级领域"
        },
        {
            "source": "植物医生德育Education金",
            "target": "Education/奖学金",
            "des": "二级领域"
        },
        {
            "source": "植物医生德育Education金",
            "target": "大学",
            "des": "二级领域"
        },
        {
            "source": "植物医生德育Education金",
            "target": "Quality Education",
            "des": "UN Category"
        },
        {
            "source": "植物医生德育Education金",
            "target": "Beijing",
            "des": "Place"
        },
        {
            "source": "植物医生德育Education金",
            "target": "北京工商大学教育基金会",
            "des": "NGO"
        },
        {
            "source": "植物医生德育Education金",
            "target": "教育",
            "des": "一级领域"
        },
        {
            "source": "植物医生德育Education金",
            "target": "Education/奖学金",
            "des": "二级领域"
        },
        {
            "source": "植物医生德育Education金",
            "target": "研究生及以上",
            "des": "二级领域"
        },
        {
            "source": "植物医生德育Education金",
            "target": "Quality Education",
            "des": "UN Category"
        },
        {
            "source": "植物医生德育Education金",
            "target": "Beijing",
            "des": "Place"
        },
        {
            "source": "图书馆“服务之星”奖励",
            "target": "北京工商大学教育基金会",
            "des": "NGO"
        },
        {
            "source": "图书馆“服务之星”奖励",
            "target": "教育",
            "des": "一级领域"
        },
        {
            "source": "图书馆“服务之星”奖励",
            "target": "Education/奖学金",
            "des": "二级领域"
        },
        {
            "source": "图书馆“服务之星”奖励",
            "target": "大学",
            "des": "二级领域"
        },
        {
            "source": "图书馆“服务之星”奖励",
            "target": "Quality Education",
            "des": "UN Category"
        },
        {
            "source": "图书馆“服务之星”奖励",
            "target": "Beijing",
            "des": "Place"
        },
        {
            "source": "宝供物流奖学金",
            "target": "北京工商大学教育基金会",
            "des": "NGO"
        },
        {
            "source": "宝供物流奖学金",
            "target": "教育",
            "des": "一级领域"
        },
        {
            "source": "宝供物流奖学金",
            "target": "Education/奖学金",
            "des": "二级领域"
        },
        {
            "source": "宝供物流奖学金",
            "target": "研究生及以上",
            "des": "二级领域"
        },
        {
            "source": "宝供物流奖学金",
            "target": "Quality Education",
            "des": "UN Category"
        },
        {
            "source": "宝供物流奖学金",
            "target": "Beijing",
            "des": "Place"
        },
        {
            "source": "特殊教育资助活动",
            "target": "上海市黄浦区教育基金会",
            "des": "NGO"
        },
        {
            "source": "特殊教育资助活动",
            "target": "教育",
            "des": "一级领域"
        },
        {
            "source": "特殊教育资助活动",
            "target": "特殊教育",
            "des": "二级领域"
        },
        {
            "source": "特殊教育资助活动",
            "target": "特殊教育",
            "des": "二级领域"
        },
        {
            "source": "特殊教育资助活动",
            "target": "减少不平等",
            "des": "UN Category"
        },
        {
            "source": "特殊教育资助活动",
            "target": "Shanghai",
            "des": "Place"
        },
        {
            "source": "特殊教育资助活动",
            "target": "上海市黄浦区教育基金会",
            "des": "NGO"
        },
        {
            "source": "特殊教育资助活动",
            "target": "教育",
            "des": "一级领域"
        },
        {
            "source": "特殊教育资助活动",
            "target": "特殊教育",
            "des": "二级领域"
        },
        {
            "source": "特殊教育资助活动",
            "target": "特殊教育",
            "des": "二级领域"
        },
        {
            "source": "特殊教育资助活动",
            "target": "减少不平等",
            "des": "UN Category"
        },
        {
            "source": "特殊教育资助活动",
            "target": "Shanghai",
            "des": "Place"
        },
        {
            "source": "基金会成长基金",
            "target": "上海华东理工大学教育发展基金会",
            "des": "NGO"
        },
        {
            "source": "基金会成长基金",
            "target": "公益事业发展",
            "des": "一级领域"
        },
        {
            "source": "基金会成长基金",
            "target": "机构发展",
            "des": "二级领域"
        },
        {
            "source": "基金会成长基金",
            "target": "基金会",
            "des": "二级领域"
        },
        {
            "source": "基金会成长基金",
            "target": "Quality Education",
            "des": "UN Category"
        },
        {
            "source": "基金会成长基金",
            "target": "Shanghai",
            "des": "Place"
        },
        {
            "source": "曹光彪奖励",
            "target": "上海市黄浦区教育基金会",
            "des": "NGO"
        },
        {
            "source": "曹光彪奖励",
            "target": "教育",
            "des": "一级领域"
        },
        {
            "source": "曹光彪奖励",
            "target": "Education/奖学金",
            "des": "二级领域"
        },
        {
            "source": "曹光彪奖励",
            "target": "小学",
            "des": "二级领域"
        },
        {
            "source": "曹光彪奖励",
            "target": "Quality Education",
            "des": "UN Category"
        },
        {
            "source": "曹光彪奖励",
            "target": "Shanghai",
            "des": "Place"
        },
        {
            "source": "教科研推广",
            "target": "上海市黄浦区教育基金会",
            "des": "NGO"
        },
        {
            "source": "教科研推广",
            "target": "教育",
            "des": "一级领域"
        },
        {
            "source": "教科研推广",
            "target": "教育服务",
            "des": "二级领域"
        },
        {
            "source": "教科研推广",
            "target": "教学发展",
            "des": "二级领域"
        },
        {
            "source": "教科研推广",
            "target": "体面工作和经济增长",
            "des": "UN Category"
        },
        {
            "source": "教科研推广",
            "target": "Shanghai",
            "des": "Place"
        },
        {
            "source": "60002801徐金生蔡玉霞伉俪励志助奖学金Project（资助中心）",
            "target": "北京师范大学教育基金会",
            "des": "NGO"
        },
        {
            "source": "60002801徐金生蔡玉霞伉俪励志助奖学金Project（资助中心）",
            "target": "教育",
            "des": "一级领域"
        },
        {
            "source": "60002801徐金生蔡玉霞伉俪励志助奖学金Project（资助中心）",
            "target": "Education/奖学金",
            "des": "二级领域"
        },
        {
            "source": "60002801徐金生蔡玉霞伉俪励志助奖学金Project（资助中心）",
            "target": "研究生及以上",
            "des": "二级领域"
        },
        {
            "source": "60002801徐金生蔡玉霞伉俪励志助奖学金Project（资助中心）",
            "target": "No Poverty",
            "des": "UN Category"
        },
        {
            "source": "60002801徐金生蔡玉霞伉俪励志助奖学金Project（资助中心）",
            "target": "Beijing",
            "des": "Place"
        },
        {
            "source": "500107中外公益慈善交流与合作基金（公益研院）",
            "target": "北京师范大学教育基金会",
            "des": "NGO"
        },
        {
            "source": "500107中外公益慈善交流与合作基金（公益研院）",
            "target": "扶贫助困",
            "des": "一级领域"
        },
        {
            "source": "500107中外公益慈善交流与合作基金（公益研院）",
            "target": "扶贫助困服务",
            "des": "二级领域"
        },
        {
            "source": "500107中外公益慈善交流与合作基金（公益研院）",
            "target": "资金支持",
            "des": "二级领域"
        },
        {
            "source": "500107中外公益慈善交流与合作基金（公益研院）",
            "target": "促进目标实现的伙伴关系",
            "des": "UN Category"
        },
        {
            "source": "500107中外公益慈善交流与合作基金（公益研院）",
            "target": "Beijing",
            "des": "Place"
        },
        {
            "source": "“钟香驹”奖学金",
            "target": "北京工商大学教育基金会",
            "des": "NGO"
        },
        {
            "source": "“钟香驹”奖学金",
            "target": "教育",
            "des": "一级领域"
        },
        {
            "source": "“钟香驹”奖学金",
            "target": "Education/奖学金",
            "des": "二级领域"
        },
        {
            "source": "“钟香驹”奖学金",
            "target": "研究生及以上",
            "des": "二级领域"
        },
        {
            "source": "“钟香驹”奖学金",
            "target": "Quality Education",
            "des": "UN Category"
        },
        {
            "source": "“钟香驹”奖学金",
            "target": "Beijing",
            "des": "Place"
        },
        {
            "source": "20003602京师高铭暄学术活动基金",
            "target": "北京师范大学教育基金会",
            "des": "NGO"
        },
        {
            "source": "20003602京师高铭暄学术活动基金",
            "target": "教育",
            "des": "一级领域"
        },
        {
            "source": "20003602京师高铭暄学术活动基金",
            "target": "教育服务",
            "des": "二级领域"
        },
        {
            "source": "20003602京师高铭暄学术活动基金",
            "target": "教学发展",
            "des": "二级领域"
        },
        {
            "source": "20003602京师高铭暄学术活动基金",
            "target": "Quality Education",
            "des": "UN Category"
        },
        {
            "source": "20003602京师高铭暄学术活动基金",
            "target": "Beijing",
            "des": "Place"
        },
        {
            "source": "退休校级领导沙龙活动",
            "target": "上海市黄浦区教育基金会",
            "des": "NGO"
        },
        {
            "source": "退休校级领导沙龙活动",
            "target": "教育",
            "des": "一级领域"
        },
        {
            "source": "退休校级领导沙龙活动",
            "target": "教育服务",
            "des": "二级领域"
        },
        {
            "source": "退休校级领导沙龙活动",
            "target": "教师资助",
            "des": "二级领域"
        },
        {
            "source": "退休校级领导沙龙活动",
            "target": "可持续城市和社区",
            "des": "UN Category"
        },
        {
            "source": "退休校级领导沙龙活动",
            "target": "Shanghai",
            "des": "Place"
        },
        {
            "source": "300025人文宗教高等研究院基金",
            "target": "北京师范大学教育基金会",
            "des": "NGO"
        },
        {
            "source": "300025人文宗教高等研究院基金",
            "target": "教育",
            "des": "一级领域"
        },
        {
            "source": "300025人文宗教高等研究院基金",
            "target": "教育服务",
            "des": "二级领域"
        },
        {
            "source": "300025人文宗教高等研究院基金",
            "target": "教学发展",
            "des": "二级领域"
        },
        {
            "source": "300025人文宗教高等研究院基金",
            "target": "可持续城市和社区",
            "des": "UN Category"
        },
        {
            "source": "300025人文宗教高等研究院基金",
            "target": "Beijing",
            "des": "Place"
        },
        {
            "source": "上海学习科研研究所",
            "target": "上海市黄浦区教育基金会",
            "des": "NGO"
        },
        {
            "source": "上海学习科研研究所",
            "target": "教育",
            "des": "一级领域"
        },
        {
            "source": "上海学习科研研究所",
            "target": "教育服务",
            "des": "二级领域"
        },
        {
            "source": "上海学习科研研究所",
            "target": "教学发展",
            "des": "二级领域"
        },
        {
            "source": "上海学习科研研究所",
            "target": "Quality Education",
            "des": "UN Category"
        },
        {
            "source": "上海学习科研研究所",
            "target": "Shanghai",
            "des": "Place"
        },
        {
            "source": "健身康乐行",
            "target": "上海市黄浦区教育基金会",
            "des": "NGO"
        },
        {
            "source": "健身康乐行",
            "target": "教育",
            "des": "一级领域"
        },
        {
            "source": "健身康乐行",
            "target": "教育服务",
            "des": "二级领域"
        },
        {
            "source": "健身康乐行",
            "target": "教师资助",
            "des": "二级领域"
        },
        {
            "source": "健身康乐行",
            "target": "减少不平等",
            "des": "UN Category"
        },
        {
            "source": "健身康乐行",
            "target": "Shanghai",
            "des": "Place"
        },
        {
            "source": "上钢公益社区专项基金",
            "target": "上海仁德基金会",
            "des": "NGO"
        },
        {
            "source": "上钢公益社区专项基金",
            "target": "公益事业发展",
            "des": "一级领域"
        },
        {
            "source": "上钢公益社区专项基金",
            "target": "机构发展",
            "des": "二级领域"
        },
        {
            "source": "上钢公益社区专项基金",
            "target": "公益NGO",
            "des": "二级领域"
        },
        {
            "source": "上钢公益社区专项基金",
            "target": "可持续城市和社区",
            "des": "UN Category"
        },
        {
            "source": "上钢公益社区专项基金",
            "target": "Shanghai",
            "des": "Place"
        },
        {
            "source": "梅特勒-托利多奖学金",
            "target": "上海华东理工大学教育发展基金会",
            "des": "NGO"
        },
        {
            "source": "梅特勒-托利多奖学金",
            "target": "教育",
            "des": "一级领域"
        },
        {
            "source": "梅特勒-托利多奖学金",
            "target": "Education/奖学金",
            "des": "二级领域"
        },
        {
            "source": "梅特勒-托利多奖学金",
            "target": "大学",
            "des": "二级领域"
        },
        {
            "source": "梅特勒-托利多奖学金",
            "target": "Quality Education",
            "des": "UN Category"
        },
        {
            "source": "梅特勒-托利多奖学金",
            "target": "Shanghai",
            "des": "Place"
        },
        {
            "source": "上海永利带业股份有限公司捐赠",
            "target": "上海华东理工大学教育发展基金会",
            "des": "NGO"
        },
        {
            "source": "上海永利带业股份有限公司捐赠",
            "target": "教育",
            "des": "一级领域"
        },
        {
            "source": "上海永利带业股份有限公司捐赠",
            "target": "校园建设",
            "des": "二级领域"
        },
        {
            "source": "上海永利带业股份有限公司捐赠",
            "target": "校园建设",
            "des": "二级领域"
        },
        {
            "source": "上海永利带业股份有限公司捐赠",
            "target": "Quality Education",
            "des": "UN Category"
        },
        {
            "source": "上海永利带业股份有限公司捐赠",
            "target": "Shanghai",
            "des": "Place"
        },
        {
            "source": "重大疾病帮扶",
            "target": "上海复大公益基金会",
            "des": "NGO"
        },
        {
            "source": "重大疾病帮扶",
            "target": "医疗救助",
            "des": "一级领域"
        },
        {
            "source": "重大疾病帮扶",
            "target": "重大疾病",
            "des": "二级领域"
        },
        {
            "source": "重大疾病帮扶",
            "target": "白血病",
            "des": "二级领域"
        },
        {
            "source": "重大疾病帮扶",
            "target": "良好健康与福祉",
            "des": "UN Category"
        },
        {
            "source": "重大疾病帮扶",
            "target": "Shanghai",
            "des": "Place"
        },
        {
            "source": "仁德醒来基金",
            "target": "上海仁德基金会",
            "des": "NGO"
        },
        {
            "source": "仁德醒来基金",
            "target": "医疗救助",
            "des": "一级领域"
        },
        {
            "source": "仁德醒来基金",
            "target": "重大疾病",
            "des": "二级领域"
        },
        {
            "source": "仁德醒来基金",
            "target": "重大疾病",
            "des": "二级领域"
        },
        {
            "source": "仁德醒来基金",
            "target": "良好健康与福祉",
            "des": "UN Category"
        },
        {
            "source": "仁德醒来基金",
            "target": "Shanghai",
            "des": "Place"
        },
        {
            "source": "卡西欧",
            "target": "上海外国语大学教育发展基金会",
            "des": "NGO"
        },
        {
            "source": "卡西欧",
            "target": "教育",
            "des": "一级领域"
        },
        {
            "source": "卡西欧",
            "target": "Education/奖学金",
            "des": "二级领域"
        },
        {
            "source": "卡西欧",
            "target": "大学",
            "des": "二级领域"
        },
        {
            "source": "卡西欧",
            "target": "Quality Education",
            "des": "UN Category"
        },
        {
            "source": "卡西欧",
            "target": "Shanghai",
            "des": "Place"
        },
        {
            "source": "其他公益活动",
            "target": "广州市小星辰儿童成长基金会",
            "des": "NGO"
        },
        {
            "source": "其他公益活动",
            "target": "志愿服务",
            "des": "一级领域"
        },
        {
            "source": "其他公益活动",
            "target": "志愿活动支持",
            "des": "二级领域"
        },
        {
            "source": "其他公益活动",
            "target": "活动支持",
            "des": "二级领域"
        },
        {
            "source": "其他公益活动",
            "target": "性别平等",
            "des": "UN Category"
        },
        {
            "source": "其他公益活动",
            "target": "Shanghai",
            "des": "Place"
        },
        {
            "source": "上钢公益社区专项基金",
            "target": "上海仁德基金会",
            "des": "NGO"
        },
        {
            "source": "上钢公益社区专项基金",
            "target": "公益事业发展",
            "des": "一级领域"
        },
        {
            "source": "上钢公益社区专项基金",
            "target": "机构发展",
            "des": "二级领域"
        },
        {
            "source": "上钢公益社区专项基金",
            "target": "基金会",
            "des": "二级领域"
        },
        {
            "source": "上钢公益社区专项基金",
            "target": "可持续城市和社区",
            "des": "UN Category"
        },
        {
            "source": "上钢公益社区专项基金",
            "target": "Shanghai",
            "des": "Place"
        },
        {
            "source": "1000980003华民慈善基金会大学生就业扶助Project",
            "target": "北京师范大学教育基金会",
            "des": "NGO"
        },
        {
            "source": "1000980003华民慈善基金会大学生就业扶助Project",
            "target": "创业就业",
            "des": "一级领域"
        },
        {
            "source": "1000980003华民慈善基金会大学生就业扶助Project",
            "target": "就业服务",
            "des": "二级领域"
        },
        {
            "source": "1000980003华民慈善基金会大学生就业扶助Project",
            "target": "技能培训",
            "des": "二级领域"
        },
        {
            "source": "1000980003华民慈善基金会大学生就业扶助Project",
            "target": "Quality Education",
            "des": "UN Category"
        },
        {
            "source": "1000980003华民慈善基金会大学生就业扶助Project",
            "target": "Beijing",
            "des": "Place"
        },
        {
            "source": "北京师范大学教育基金会",
            "target": [
                "教育",
                "科学研究"
            ],
            "des": "一级领域"
        },
        {
            "source": "北京师范大学教育基金会",
            "target": "Beijing",
            "des": "Place"
        },
        {
            "source": "北京师范大学教育基金会",
            "target": "2007-01-30",
            "des": "Founded"
        },
        {
            "source": "北京师范大学教育基金会",
            "target": "Beijing Normal University Education Foundation",
            "des": "NGO"
        },
        {
            "source": "北京师范大学教育基金会",
            "target": " 527,984,343.18",
            "des": "NGO"
        },
        {
            "source": "上海华东理工大学教育发展基金会",
            "target": [
                "教育"
            ],
            "des": "一级领域"
        },
        {
            "source": "上海华东理工大学教育发展基金会",
            "target": "Shanghai",
            "des": "Place"
        },
        {
            "source": "上海华东理工大学教育发展基金会",
            "target": "2011-10-08",
            "des": "Founded"
        },
        {
            "source": "上海华东理工大学教育发展基金会",
            "target": "Shanghai East China University of Science and Technology Education Development Foundation",
            "des": "NGO"
        },
        {
            "source": "上海华东理工大学教育发展基金会",
            "target": " 18,592,230.92",
            "des": "NGO"
        },
        {
            "source": "上海外国语大学教育发展基金会",
            "target": [
                "教育",
                "科学研究"
            ],
            "des": "一级领域"
        },
        {
            "source": "上海外国语大学教育发展基金会",
            "target": "Shanghai",
            "des": "Place"
        },
        {
            "source": "上海外国语大学教育发展基金会",
            "target": "2009-12-17",
            "des": "Founded"
        },
        {
            "source": "上海外国语大学教育发展基金会",
            "target": "Shanghai International Studies University Education Development Foundation",
            "des": "NGO"
        },
        {
            "source": "上海外国语大学教育发展基金会",
            "target": " 14,649,197.26",
            "des": "NGO"
        },
        {
            "source": "上海仁德基金会",
            "target": [
                "扶贫助困",
                "社区发展"
            ],
            "des": "一级领域"
        },
        {
            "source": "上海仁德基金会",
            "target": "Shanghai",
            "des": "Place"
        },
        {
            "source": "上海仁德基金会",
            "target": "2011-12-07",
            "des": "Founded"
        },
        {
            "source": "上海仁德基金会",
            "target": "Shanghai Rende Foundation",
            "des": "NGO"
        },
        {
            "source": "上海仁德基金会",
            "target": " 7,400,084.01",
            "des": "NGO"
        },
        {
            "source": "北京凯恩克劳斯经济研究基金会",
            "target": [
                "科学研究"
            ],
            "des": "一级领域"
        },
        {
            "source": "北京凯恩克劳斯经济研究基金会",
            "target": "Beijing",
            "des": "Place"
        },
        {
            "source": "北京凯恩克劳斯经济研究基金会",
            "target": "2007-11-07",
            "des": "Founded"
        },
        {
            "source": "北京凯恩克劳斯经济研究基金会",
            "target": "Cairncross Economic Research Foundation",
            "des": "NGO"
        },
        {
            "source": "北京凯恩克劳斯经济研究基金会",
            "target": " 9,836,874.26",
            "des": "NGO"
        },
        {
            "source": "北京工商大学教育基金会",
            "target": [
                "教育",
                "科学研究"
            ],
            "des": "一级领域"
        },
        {
            "source": "北京工商大学教育基金会",
            "target": "Beijing",
            "des": "Place"
        },
        {
            "source": "北京工商大学教育基金会",
            "target": "2009-12-03",
            "des": "Founded"
        },
        {
            "source": "北京工商大学教育基金会",
            "target": "Beijing Technology and Business University Education Foundation",
            "des": "NGO"
        },
        {
            "source": "北京工商大学教育基金会",
            "target": " 4,378,230.82",
            "des": "NGO"
        },
        {
            "source": "Beijing刘光鼎地球物理科学基金会",
            "target": [
                "教育",
                "科学研究"
            ],
            "des": "一级领域"
        },
        {
            "source": "Beijing刘光鼎地球物理科学基金会",
            "target": "Beijing",
            "des": "Place"
        },
        {
            "source": "Beijing刘光鼎地球物理科学基金会",
            "target": "2007-03-28",
            "des": "Founded"
        },
        {
            "source": "Beijing刘光鼎地球物理科学基金会",
            "target": "Beijing Liuguangding Physical Geography Science Foundation",
            "des": "NGO"
        },
        {
            "source": "Beijing刘光鼎地球物理科学基金会",
            "target": " 1,835,964.97",
            "des": "NGO"
        },
        {
            "source": "上海复大公益基金会",
            "target": [
                "教育"
            ],
            "des": "一级领域"
        },
        {
            "source": "上海复大公益基金会",
            "target": "Shanghai",
            "des": "Place"
        },
        {
            "source": "上海复大公益基金会",
            "target": "2011-06-10",
            "des": "Founded"
        },
        {
            "source": "上海复大公益基金会",
            "target": "Shanghai Fuda Foundation",
            "des": "NGO"
        },
        {
            "source": "上海复大公益基金会",
            "target": " 6,433,381.14",
            "des": "NGO"
        },
        {
            "source": "上海市黄浦区教育基金会",
            "target": [
                "教育"
            ],
            "des": "一级领域"
        },
        {
            "source": "上海市黄浦区教育基金会",
            "target": "Shanghai",
            "des": "Place"
        },
        {
            "source": "上海市黄浦区教育基金会",
            "target": "1992-05-28",
            "des": "Founded"
        },
        {
            "source": "上海市黄浦区教育基金会",
            "target": "Shanghai Huangpu Education Foundation",
            "des": "NGO"
        },
        {
            "source": "上海市黄浦区教育基金会",
            "target": " 68,718,635.67",
            "des": "NGO"
        }],
        categories: categories,
    }]
    };
    myChart.setOption(option);
    //bindChartClickEvent(myChart);
}

function showEmployeeCharts(){
    var myChart = echarts.init(document.getElementById('main'));
    var categories = [];
    var categoriesname = ["Employee", "Project"]
    for (var i = 0; i < 2; i++) {
      categories[i] = {
        name: categoriesname[i]
      };
    }
    option = {
      // 图的标题
      title: {
        text: ''
      },
      // 提示框的配置
      tooltip: {
        "formatter": function (arg) {
            var nodeType = arg.data.nodeType,
                srcName = arg.data.name,
                seriesIndex = arg.seriesIndex,
                options = myChart.getOption(),
                serieData = options.series[seriesIndex].data,
                colors = options.color,
                currentData = '',
                tips = '';
                serieData.filter(oData => oData.name === srcName).forEach(oData => currentData=oData);
            var serieSpecificDesc = currentData.des;
            if(serieSpecificDesc != undefined && serieSpecificDesc != "" && serieSpecificDesc.length > 0){
                for (var i = 0; i < serieSpecificDesc.length; i++) {
                    var desc = serieSpecificDesc[i];
                    color = getColor(colors, currentData.category);
                    //set bullets color
                    if(desc.desName != undefined){
                        tips += '<span style="background-color: ' + color + ';width: 10px;height: 10px;border-radius: 50%;display: inline-block"></span> ' 
                        + desc.desName + " : " + desc.desValue + ' <br />';
                    }
                }
            }else{
                tips += currentData.name == undefined ? '' : currentData.name ;
            }
            
            return tips;
        }
    },
      animationDurationUpdate: 300,
      animationEasingUpdate: 'quinticInOut',
      // 工具箱
      toolbox: {
        // 显示工具箱
        show: true,
        feature: {
          mark: {
            show: true
          },
          // 还原
          restore: {
            show: true
          },

          // 保存为图片
          saveAsImage: {
            show: true
          }
        }
      },
      legend: [{
        // selectedMode: 'single',
        data: categories.map(function (a) {
          return a.name;
        })
      }],
      color: ['#ca8622','#6e7074', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
      series: [{
        type: 'graph', // 类型:关系图
        layout: 'force', //图的布局，类型为力导图
        symbolSize: 5, // 调整节点的大小
        roam: "move", // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移,可以设置成 'scale' 或者 'move'。设置成 true 为都开启
        edgeSymbol: ['circle', 'none'],
        edgeSymbolSize: [2, 7],
        focusNodeAdjacency: true,
        edgeLabel: {
          normal: {
            textStyle: {
              fontSize: 20
            }
          }
        },
        force: {
          repulsion: 100,
          edgeLength: [20, 50]
        },
        draggable: true,
        lineStyle: {
          normal: {
            width: 2,
            color: '#4b565b',
          }
        },
        edgeLabel: {
          normal: {
            show: false,
            formatter: function (x) {
              return x.data.name;
            }
          }
        },
        lineStyle: {
          normal: {
            width: 0.5,
            // curveness: 0.3,
            opacity: 0.7
          }
        },
        label: {
          normal: {
            show: false,
            position: 'right',
            textStyle: {}
          }
        },

        // 数据
        data:[
{"name": "C5264891",
    "des": [{"desName" : "Name", "desValue": "C5264891"},{"desName" : "Display Name","desValue": "Binbin Zhang"},{"desName" : "Connect Power","desValue": "0.644329897"},{"desName" : "Cost Center","desValue": "CN COO"},{"desName" : "Location","desValue": "Beijing"},{"desName" : "Display Name","desValue": "Binbin Zhang"},{"desName" : "Functional Area","desValue": ""},{"desName" : "Board Area","desValue": ""}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "C5287078",
    "des": [{"desName" : "Name", "desValue": "C5287078"},{"desName" : "Display Name","desValue": "Li, Julie"},{"desName" : "Connect Power","desValue": "0.570776256"},{"desName" : "Cost Center","desValue": "Cloud HCM Engineering - Talent (CN)"},{"desName" : "Location","desValue": "Shanghai"},{"desName" : "Display Name","desValue": "Li, Julie"},{"desName" : "Functional Area","desValue": ""},{"desName" : "Board Area","desValue": ""}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "C5288676",
    "des": [{"desName" : "Display Name","desValue": "YanXi Guo"},{"desName" : "Connect Power","desValue": "0.81300813"},{"desName" : "Cost Center","desValue": "Legal - SAP China"},{"desName" : "Location","desValue": "Beijing"},{"desName" : "Functional Area","desValue": ""},{"desName" : "Board Area","desValue": ""}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I007238",
    "des": [{"desName" : "Name", "desValue": "I007238"},{"desName" : "Display Name","desValue": "June Wu"},{"desName" : "Connect Power","desValue": "0.692520776"},{"desName" : "Cost Center","desValue": "PE S4 Idea IPD China"},{"desName" : "Location","desValue": "Shanghai"},{"desName" : "Display Name","desValue": "June Wu"},{"desName" : "Functional Area","desValue": "Development"},{"desName" : "Board Area","desValue": "Intelligent Enterprise Group"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I028618",
    "des": [{"desName" : "Name", "desValue": "I028618"},{"desName" : "Display Name","desValue": "Tiemin Wang"},{"desName" : "Connect Power","desValue": "0.570776256"},{"desName" : "Cost Center","desValue": "DC SCM & IS CN"},{"desName" : "Location","desValue": "Dalian"},{"desName" : "Display Name","desValue": "Tiemin Wang"},{"desName" : "Functional Area","desValue": "Services"},{"desName" : "Board Area","desValue": "Digital Business Services"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I029176",
    "des": [{"desName" : "Name", "desValue": "I029176"},{"desName" : "Display Name","desValue": "Bo He"},{"desName" : "Connect Power","desValue": "0.692520776"},{"desName" : "Cost Center","desValue": "ITECH AN CN"},{"desName" : "Location","desValue": "Dalian"},{"desName" : "Display Name","desValue": "Bo He"},{"desName" : "Functional Area","desValue": "Services"},{"desName" : "Board Area","desValue": "Digital Business Services"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I029913",
    "des": [{"desName" : "Name", "desValue": "I029913"},{"desName" : "Display Name","desValue": "Xinyu Liu"},{"desName" : "Connect Power","desValue": "0.570776256"},{"desName" : "Cost Center","desValue": "PE S4 CL CCS LOC (CN"},{"desName" : "Location","desValue": "Shanghai"},{"desName" : "Display Name","desValue": "Xinyu Liu"},{"desName" : "Functional Area","desValue": "Development"},{"desName" : "Board Area","desValue": "Intelligent Enterprise Group"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I033209",
    "des": [{"desName" : "Name", "desValue": "I033209"},{"desName" : "Display Name","desValue": "Angela Guo"},{"desName" : "Connect Power","desValue": "0.587544066"},{"desName" : "Cost Center","desValue": "DBS GC Marketing & Communication"},{"desName" : "Location","desValue": "Shanghai"},{"desName" : "Display Name","desValue": "Angela Guo"},{"desName" : "Functional Area","desValue": "General Management & Admin"},{"desName" : "Board Area","desValue": "Digital Business Services"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I037383",
    "des": [{"desName" : "Name", "desValue": "I037383"},{"desName" : "Display Name","desValue": "May Fang"},{"desName" : "Connect Power","desValue": "0.584795322"},{"desName" : "Cost Center","desValue": "CoE_GCN_BusinessDown_VPR _CN"},{"desName" : "Location","desValue": "Beijing"},{"desName" : "Display Name","desValue": "May Fang"},{"desName" : "Functional Area","desValue": "Services"},{"desName" : "Board Area","desValue": "Digital Business Services"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I037760",
    "des": [{"desName" : "Name", "desValue": "I037760"},{"desName" : "Display Name","desValue": "Hongbo Ma"},{"desName" : "Connect Power","desValue": "0.570776256"},{"desName" : "Cost Center","desValue": "Customer Experience S&S OP Dev CHN"},{"desName" : "Location","desValue": "Chengdu"},{"desName" : "Display Name","desValue": "Hongbo Ma"},{"desName" : "Functional Area","desValue": "Development"},{"desName" : "Board Area","desValue": "Cloud Business Group"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I038245",
    "des": [{"desName" : "Name", "desValue": "I038245"},{"desName" : "Display Name","desValue": "Doris Zhang"},{"desName" : "Connect Power","desValue": "0.690607735"},{"desName" : "Cost Center","desValue": "DBS GC Office of the COO"},{"desName" : "Location","desValue": "Beijing"},{"desName" : "Display Name","desValue": "Doris Zhang"},{"desName" : "Functional Area","desValue": "Services"},{"desName" : "Board Area","desValue": "Digital Business Services"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I041571",
    "des": [{"desName" : "Name", "desValue": "I041571"},{"desName" : "Display Name","desValue": "Liz Li"},{"desName" : "Connect Power","desValue": "0.603136309"},{"desName" : "Cost Center","desValue": "Sol GC Supply Chain_CN"},{"desName" : "Location","desValue": "Beijing"},{"desName" : "Display Name","desValue": "Liz Li"},{"desName" : "Functional Area","desValue": "Services"},{"desName" : "Board Area","desValue": "Digital Business Services"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I044063",
    "des": [{"desName" : "Name", "desValue": "I044063"},{"desName" : "Display Name","desValue": "Nicole Zhang"},{"desName" : "Connect Power","desValue": "0.844594595"},{"desName" : "Cost Center","desValue": "CSM High Touch - China Hldg"},{"desName" : "Location","desValue": "Beijing"},{"desName" : "Display Name","desValue": "Nicole Zhang"},{"desName" : "Functional Area","desValue": "Services"},{"desName" : "Board Area","desValue": "Digital Business Services"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I048976",
    "des": [{"desName" : "Name", "desValue": "I048976"},{"desName" : "Display Name","desValue": "Mandy Li"},{"desName" : "Connect Power","desValue": "0.570776256"},{"desName" : "Cost Center","desValue": "PE Innovation CN CO"},{"desName" : "Location","desValue": "Shanghai"},{"desName" : "Display Name","desValue": "Mandy Li"},{"desName" : "Functional Area","desValue": "Development"},{"desName" : "Board Area","desValue": "Intelligent Enterprise Group"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I057004",
    "des": [{"desName" : "Name", "desValue": "I057004"},{"desName" : "Display Name","desValue": "Summer Zeng"},{"desName" : "Connect Power","desValue": "0.741839763"},{"desName" : "Cost Center","desValue": "PE Innovation CN CFI"},{"desName" : "Location","desValue": "Beijing"},{"desName" : "Display Name","desValue": "Summer Zeng"},{"desName" : "Functional Area","desValue": "Development"},{"desName" : "Board Area","desValue": "Intelligent Enterprise Group"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "Kate",
    "des": [
    {"desName" : "Display Name","desValue": "Kate"},
    {"desName" : "Connect Power","desValue": "0.693481276"},
    {"desName" : "Cost Center","desValue": "DC SD, S.&Proc CN"},
    {"desName" : "Location","desValue": "Dalian"},
    {"desName" : "Functional Area","desValue": "Services"},
    {"desName" : "Board Area","desValue": "Digital Business Services"}
  ],"symbolSize": 15,"category": 0,"nodeType": 0,
  label: {
      normal: {
        show: true
      }
  }
},
{"name": "I059477",
    "des": [{"desName" : "Name", "desValue": "I059477"},{"desName" : "Display Name","desValue": "Janet Min"},{"desName" : "Connect Power","desValue": "0.751879699"},{"desName" : "Cost Center","desValue": "DP HANA CN"},{"desName" : "Location","desValue": "Dalian"},{"desName" : "Display Name","desValue": "Janet Min"},{"desName" : "Functional Area","desValue": "Services"},{"desName" : "Board Area","desValue": "Digital Business Services"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I062544",
    "des": [{"desName" : "Name", "desValue": "I062544"},{"desName" : "Display Name","desValue": "Yan-hong Huang"},{"desName" : "Connect Power","desValue": "0.705218618"},{"desName" : "Cost Center","desValue": "TI HANA Plat DM SV PK (CHN)"},{"desName" : "Location","desValue": "Beijing"},{"desName" : "Display Name","desValue": "Yan-hong Huang"},{"desName" : "Functional Area","desValue": "Development"},{"desName" : "Board Area","desValue": "Technology & Innovation"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I062604",
    "des": [{"desName" : "Display Name","desValue": "Hua Wei"},{"desName" : "Connect Power","desValue": "0.894454383"},{"desName" : "Cost Center","desValue": "TI HANA Plat DM SV PK (CHN)"},{"desName" : "Location","desValue": "Beijing"},{"desName" : "Functional Area","desValue": "Development"},{"desName" : "Board Area","desValue": "Technology & Innovation"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I062703",
    "des": [{"desName" : "Name", "desValue": "I062703"},{"desName" : "Display Name","desValue": "Li-fang Li"},{"desName" : "Connect Power","desValue": "0.722543353"},{"desName" : "Cost Center","desValue": "DP HANA CN"},{"desName" : "Location","desValue": "Beijing"},{"desName" : "Display Name","desValue": "Li-fang Li"},{"desName" : "Functional Area","desValue": "Services"},{"desName" : "Board Area","desValue": "Digital Business Services"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I062837",
    "des": [{"desName" : "Name", "desValue": "I062837"},{"desName" : "Display Name","desValue": "Fancia Luo"},{"desName" : "Connect Power","desValue": "0.651041667"},{"desName" : "Cost Center","desValue": "CN Presales-Product-S4"},{"desName" : "Location","desValue": "Beijing"},{"desName" : "Display Name","desValue": "Fancia Luo"},{"desName" : "Functional Area","desValue": "Sales & Presales"},{"desName" : "Board Area","desValue": "Global Customer Operations"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I063114","des": [
  {"desName" : "Name", "desValue": "I063114"},
  {"desName" : "Display Name","desValue": "Meng Yu"},{"desName" : "Connect Power","desValue": "0.728862974"},{"desName" : "Cost Center","desValue": "TI SAP CP DWP Mobile Services (CHN)"},{"desName" : "Location","desValue": "Beijing"},{"desName" : "Display Name","desValue": "Meng Yu"},{"desName" : "Functional Area","desValue": "Development"},{"desName" : "Board Area","desValue": "Technology & Innovation"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I063171","des": [
  {"desName" : "Display Name","desValue": "Hai-lin Wei"},
  {"desName" : "Connect Power","desValue": "0.854700855"},
  {"desName" : "Cost Center","desValue": "TI SAP CP DWP Mobile Services (CHN)"},
  {"desName" : "Location","desValue": "Beijing"},
  {"desName" : "Functional Area","desValue": "Development"},{"desName" : "Board Area","desValue": "Technology & Innovation"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I063174",
  "des": [
    {"desName" : "Name", "desValue": "I063174"},
    {"desName" : "Display Name","desValue": "Autrey Dong"},{"desName" : "Connect Power","desValue": "0.771604938"},
    {"desName" : "Cost Center","desValue": "TI HANA Plat DM SV PK (CHN)"},
    {"desName" : "Location","desValue": "Beijing"},
    {"desName" : "Functional Area","desValue": "Development"},{"desName" : "Board Area","desValue": "Technology & Innovation"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I063769",
    "des": [{"desName" : "Name", "desValue": "I063769"},{"desName" : "Display Name","desValue": "Galen Gao"},{"desName" : "Connect Power","desValue": "0.636942675"},{"desName" : "Cost Center","desValue": "AM - Sales - A02"},{"desName" : "Location","desValue": "Beijing"},{"desName" : "Display Name","desValue": "Galen Gao"},{"desName" : "Functional Area","desValue": "Sales & Presales"},{"desName" : "Board Area","desValue": "Digital Business Services"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I064390",
  "des": [{"desName" : "Name", "desValue": "I064390"},{"desName" : "Display Name","desValue": "Daveice Wu"},{"desName" : "Connect Power","desValue": "0.570776256"},{"desName" : "Cost Center","desValue": "PE Innovat CN RR"},{"desName" : "Location","desValue": "Shanghai"},{"desName" : "Display Name","desValue": "Daveice Wu"},{"desName" : "Functional Area","desValue": "Development"},{"desName" : "Board Area","desValue": "Intelligent Enterprise Group"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I065345",
  "des": [{"desName" : "Name", "desValue": "I065345"},{"desName" : "Display Name","desValue": "Sophie Chang"},{"desName" : "Connect Power","desValue": "0.707213579"},{"desName" : "Cost Center","desValue": "SF CN GB North"},{"desName" : "Location","desValue": "Beijing"},{"desName" : "Display Name","desValue": "Sophie Chang"},{"desName" : "Functional Area","desValue": "Sales & Presales"},{"desName" : "Board Area","desValue": "Global Customer Operations"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I068096",
  "des": [{"desName" : "Name", "desValue": "I068096"},{"desName" : "Display Name","desValue": "Leon Gao"},{"desName" : "Connect Power","desValue": "0.570776256"},{"desName" : "Cost Center","desValue": "SMB B1 Product Development and Technolog"},{"desName" : "Location","desValue": "Shanghai"},{"desName" : "Display Name","desValue": "Leon Gao"},{"desName" : "Functional Area","desValue": "Development"},{"desName" : "Board Area","desValue": "Intelligent Enterprise Group"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I068789","des": [
  {"desName" : "Display Name","desValue": "Yin-long Fan"},{"desName" : "Connect Power","desValue": "0.705218618"},
  {"desName" : "Cost Center","desValue": "TI HANA Plat DM SV PK (CHN)"},
  {"desName" : "Location","desValue": "Beijing"},
  {"desName" : "Functional Area","desValue": "Development"},{"desName" : "Board Area","desValue": "Technology & Innovation"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I069176",
    "des": [{"desName" : "Name", "desValue": "I069176"},{"desName" : "Display Name","desValue": "Ariel Xu"},{"desName" : "Connect Power","desValue": "0.571428571"},{"desName" : "Cost Center","desValue": "GCGB-PSD-PBS-CN"},{"desName" : "Location","desValue": "Chengdu"},{"desName" : "Display Name","desValue": "Ariel Xu"},{"desName" : "Functional Area","desValue": "Sales & Presales"},{"desName" : "Board Area","desValue": "Global Customer Operations"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I069410",
    "des": [{"desName" : "Name", "desValue": "I069410"},{"desName" : "Display Name","desValue": "Yann Li"},{"desName" : "Connect Power","desValue": "0.692520776"},{"desName" : "Cost Center","desValue": "SDC GC Industries"},{"desName" : "Location","desValue": "Dalian"},{"desName" : "Display Name","desValue": "Yann Li"},{"desName" : "Functional Area","desValue": "Services"},{"desName" : "Board Area","desValue": "Digital Business Services"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I070172",
    "des": [{"desName" : "Name", "desValue": "I070172"},{"desName" : "Display Name","desValue": "Judith Wu"},{"desName" : "Connect Power","desValue": "0.570776256"},{"desName" : "Cost Center","desValue": "APJ Local HR Services China SH"},{"desName" : "Location","desValue": "Shanghai"},{"desName" : "Display Name","desValue": "Judith Wu"},{"desName" : "Functional Area","desValue": "Human Resources"},{"desName" : "Board Area","desValue": "Human Resources"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I073098","des": [
  {"desName" : "Name", "desValue": "I073098"},
  {"desName" : "Display Name","desValue": "Fan Fu"},{"desName" : "Connect Power","desValue": "0.792393027"},{"desName" : "Cost Center","desValue": "CN Presales -- Discrete & HT PCSM"},{"desName" : "Location","desValue": "Beijing"},{"desName" : "Display Name","desValue": "Fan Fu"},{"desName" : "Functional Area","desValue": "Sales & Presales"},{"desName" : "Board Area","desValue": "Global Customer Operations"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I074438","des": [
  {"desName" : "Display Name","desValue": "Lan Sun"},{"desName" : "Connect Power","desValue": "0.844594595"},
  {"desName" : "Cost Center","desValue": "CoE_GCN_S/4_DM_LT_CN"},{"desName" : "Location","desValue": "Beijing"},
  {"desName" : "Functional Area","desValue": "Services"},{"desName" : "Board Area","desValue": "Digital Business Services"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "Amy",
  "des": [
  {"desName" : "Display Name","desValue": "Amy"},
  {"desName" : "Connect Power","desValue": "0.570776256"},
  {"desName" : "Cost Center","desValue": "Talent, Leadership & Learning CHINA"},
  {"desName" : "Location","desValue": "Shanghai"},
  {"desName" : "Functional Area","desValue": "Human Resources"},
  {"desName" : "Board Area","desValue": "Human Resources"}],"symbolSize": 15,"category": 0,"nodeType": 0,
  label: {
      normal: {
        show: true
      }
    }
},
{"name": "I075198","des": [
  {"desName" : "Display Name","desValue": "Sally Chen"},
  {"desName" : "Connect Power","desValue": "0.837520938"},
  {"desName" : "Cost Center","desValue": "Partner Enablement"},
  {"desName" : "Location","desValue": "Beijing"},
  {"desName" : "Functional Area","desValue": "Sales & Presales"},{"desName" : "Board Area","desValue": "Global Customer Operations"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I075255","des": [
    {"desName" : "Name", "desValue": "I075255"},{"desName" : "Display Name","desValue": "Helen Tian"},{"desName" : "Connect Power","desValue": "0.707213579"},{"desName" : "Cost Center","desValue": "CA GC CHN"},{"desName" : "Location","desValue": "Beijing"},{"desName" : "Display Name","desValue": "Helen Tian"},{"desName" : "Functional Area","desValue": "Communications"},{"desName" : "Board Area","desValue": "Office of CEO"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I075689",
    "des": [{"desName" : "Name", "desValue": "I075689"},{"desName" : "Display Name","desValue": "Annie Chen"},{"desName" : "Connect Power","desValue": "0.602409639"},{"desName" : "Cost Center","desValue": "PLS ST ICC (China)"},{"desName" : "Location","desValue": "Shanghai"},{"desName" : "Display Name","desValue": "Annie Chen"},{"desName" : "Functional Area","desValue": "Services"},{"desName" : "Board Area","desValue": "Global Customer Operations"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I076298",
  "des": [{"desName" : "Name", "desValue": "I076298"},{"desName" : "Display Name","desValue": "Angela Liu"},{"desName" : "Connect Power","desValue": "0.664010624"},{"desName" : "Cost Center","desValue": "PLS ST ICC (China)"},{"desName" : "Location","desValue": "Beijing"},{"desName" : "Display Name","desValue": "Angela Liu"},{"desName" : "Functional Area","desValue": "Services"},{"desName" : "Board Area","desValue": "Global Customer Operations"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I077125",
    "des": [{"desName" : "Name", "desValue": "I077125"},{"desName" : "Display Name","desValue": "Juliet Zhang"},{"desName" : "Connect Power","desValue": "0.570776256"},{"desName" : "Cost Center","desValue": "CoE_GCN_HANA_Modelling_CN"},{"desName" : "Location","desValue": "Beijing"},{"desName" : "Display Name","desValue": "Juliet Zhang"},{"desName" : "Functional Area","desValue": "Services"},{"desName" : "Board Area","desValue": "Digital Business Services"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I300027",
  "des": [
    {"desName" : "Display Name","desValue": "Jennifer Jin"},
    {"desName" : "Connect Power","desValue": "0.728862974"},
    {"desName" : "Cost Center","desValue": "Partner Enablement"},
    {"desName" : "Location","desValue": "Beijing"},
    {"desName" : "Functional Area","desValue": "Sales & Presales"},
    {"desName" : "Board Area","desValue": "Global Customer Operations"}
  ],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I303519",
    "des": [{"desName" : "Name", "desValue": "I303519"},{"desName" : "Display Name","desValue": "Leo Lu"},{"desName" : "Connect Power","desValue": "0.570776256"},{"desName" : "Cost Center","desValue": "PE S4 SPBF Ind Ap CN"},{"desName" : "Location","desValue": "Shanghai"},{"desName" : "Display Name","desValue": "Leo Lu"},{"desName" : "Functional Area","desValue": "Development"},{"desName" : "Board Area","desValue": "Intelligent Enterprise Group"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "Sherry",
  "des": [
    {"desName" : "Display Name","desValue": "Sherry"},{"desName" : "Connect Power","desValue": "0.907441016"},
    {"desName" : "Cost Center","desValue": "CA GC CHN"},
    {"desName" : "Location","desValue": "Beijing"},
    {"desName" : "Functional Area","desValue": "Communications"},
    {"desName" : "Board Area","desValue": "Office of CEO"}],"symbolSize": 15,"category": 0,"nodeType": 0,
    label: {
      normal: {
        show: true
      }
}  
  },
{"name": "I306528",
    "des": [{"desName" : "Name", "desValue": "I306528"},{"desName" : "Display Name","desValue": "Cindy Shen"},{"desName" : "Connect Power","desValue": "0.620347395"},{"desName" : "Cost Center","desValue": "DP NW Platform CN"},{"desName" : "Location","desValue": "Dalian"},{"desName" : "Display Name","desValue": "Cindy Shen"},{"desName" : "Functional Area","desValue": "Services"},{"desName" : "Board Area","desValue": "Digital Business Services"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I306809",
  "des": [{"desName" : "Name", "desValue": "I306809"},{"desName" : "Display Name","desValue": "Gabby Chang"},{"desName" : "Connect Power","desValue": "0.618811881"},{"desName" : "Cost Center","desValue": "PE S4 CL"},{"desName" : "Location","desValue": "Shanghai"},{"desName" : "Display Name","desValue": "Gabby Chang"},{"desName" : "Functional Area","desValue": "Development"},{"desName" : "Board Area","desValue": "Intelligent Enterprise Group"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I308129",
    "des": [{"desName" : "Name", "desValue": "I308129"},{"desName" : "Display Name","desValue": "Wendy Liu"},{"desName" : "Connect Power","desValue": "0.570776256"},{"desName" : "Cost Center","desValue": "Analytics OEM CN"},{"desName" : "Location","desValue": "Shanghai"},{"desName" : "Display Name","desValue": "Wendy Liu"},{"desName" : "Functional Area","desValue": "Development"},{"desName" : "Board Area","desValue": "Technology & Innovation"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I310074","des": [
  {"desName" : "Name", "desValue": "I310074"},
  {"desName" : "Display Name","desValue": "Haley Yin"},{"desName" : "Connect Power","desValue": "0.778816199"},{"desName" : "Cost Center","desValue": "PE Innovation CN CFI"},{"desName" : "Location","desValue": "Beijing"},{"desName" : "Display Name","desValue": "Haley Yin"},{"desName" : "Functional Area","desValue": "Development"},{"desName" : "Board Area","desValue": "Intelligent Enterprise Group"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I310095",
  "des": [{"desName" : "Name", "desValue": "I310095"},{"desName" : "Display Name","desValue": "Li-hua Yang"},{"desName" : "Connect Power","desValue": "0.821018062"},{"desName" : "Cost Center","desValue": "TI SAP CP DWP Mobile Services (CHN)"},{"desName" : "Location","desValue": "Beijing"},{"desName" : "Display Name","desValue": "Li-hua Yang"},{"desName" : "Functional Area","desValue": "Development"},{"desName" : "Board Area","desValue": "Technology & Innovation"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I310190",
    "des": [{"desName" : "Name", "desValue": "I310190"},{"desName" : "Display Name","desValue": "Frank Song"},{"desName" : "Connect Power","desValue": "0.777604977"},{"desName" : "Cost Center","desValue": "PE Innovation CN CFI"},{"desName" : "Location","desValue": "Beijing"},{"desName" : "Display Name","desValue": "Frank Song"},{"desName" : "Functional Area","desValue": "Development"},{"desName" : "Board Area","desValue": "Intelligent Enterprise Group"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I311783",
  "des": [
  {"desName" : "Display Name","desValue": "Tao Zhang"},
  {"desName" : "Connect Power","desValue": "0.570776256"},
  {"desName" : "Cost Center","desValue": "Cloud HCM PM - Platform (CN)"},
  {"desName" : "Location","desValue": "Shanghai"},
  {"desName" : "Functional Area","desValue": "Development"},
  {"desName" : "Board Area","desValue": "Cloud Business Group"}
],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I317087",
    "des": [{"desName" : "Name", "desValue": "I317087"},{"desName" : "Display Name","desValue": "Candy Zhan"},{"desName" : "Connect Power","desValue": "0.67114094"},{"desName" : "Cost Center","desValue": "DP HANA CN"},{"desName" : "Location","desValue": "Dalian"},{"desName" : "Display Name","desValue": "Candy Zhan"},{"desName" : "Functional Area","desValue": "Services"},{"desName" : "Board Area","desValue": "Digital Business Services"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I317106","des": [
  {"desName" : "Name", "desValue": "I317106"},
  {"desName" : "Display Name","desValue": "Chenqi Yang"},{"desName" : "Connect Power","desValue": "0.618811881"},{"desName" : "Cost Center","desValue": "Cloud SF COE"},{"desName" : "Location","desValue": "Beijing"},{"desName" : "Display Name","desValue": "Chenqi Yang"},{"desName" : "Functional Area","desValue": "Sales & Presales"},{"desName" : "Board Area","desValue": "Global Customer Operations"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I317228",
  "des": [
    {"desName" : "Name", "desValue": "I317228"},{"desName" : "Display Name","desValue": "Haiying Guan"},{"desName" : "Connect Power","desValue": "0.561797753"},{"desName" : "Cost Center","desValue": "MD office"},{"desName" : "Location","desValue": "Beijing"},{"desName" : "Display Name","desValue": "Haiying Guan"},{"desName" : "Functional Area","desValue": "Sales & Presales"},{"desName" : "Board Area","desValue": "Global Customer Operations"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I318559","des": [
    {"desName" : "Name", "desValue": "I318559"},
    {"desName" : "Display Name","desValue": "Vivian Gao"},{"desName" : "Connect Power","desValue": "0.561797753"},{"desName" : "Cost Center","desValue": "Build SAP like a Factory-CN"},{"desName" : "Location","desValue": "Beijing"},{"desName" : "Display Name","desValue": "Vivian Gao"},{"desName" : "Functional Area","desValue": "Services"},{"desName" : "Board Area","desValue": "Digital Business Services"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I320247",
  "des": [{"desName" : "Name", "desValue": "I320247"},{"desName" : "Display Name","desValue": "Guoquan Xing"},{"desName" : "Connect Power","desValue": "0.618811881"},{"desName" : "Cost Center","desValue": "GS FIN CN2-1"},{"desName" : "Location","desValue": "Shanghai"},{"desName" : "Display Name","desValue": "Guoquan Xing"},{"desName" : "Functional Area","desValue": "Development"},{"desName" : "Board Area","desValue": "Intelligent Enterprise Group"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I321210",
"des": [
  {"desName" : "Name", "desValue": "I321210"},
  {"desName" : "Display Name","desValue": "Lily"},
  {"desName" : "Connect Power","desValue": "0.801282051"},
  {"desName" : "Cost Center","desValue": "PE Innovation CN CFI"},
  {"desName" : "Location","desValue": "Beijing"},
  {"desName" : "Functional Area","desValue": "Development"},
  {"desName" : "Board Area","desValue": "Intelligent Enterprise Group"}],
  "symbolSize": 15,"category": 0,"nodeType": 0
},
{"name": "I322282",
    "des": [{"desName" : "Name", "desValue": "I322282"},{"desName" : "Display Name","desValue": "Hailie He"},{"desName" : "Connect Power","desValue": "0.571428571"},{"desName" : "Cost Center","desValue": "GCGB-PSD-PBS-CN"},{"desName" : "Location","desValue": "Chengdu"},{"desName" : "Display Name","desValue": "Hailie He"},{"desName" : "Functional Area","desValue": "Sales & Presales"},{"desName" : "Board Area","desValue": "Global Customer Operations"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I327873",
    "des": [{"desName" : "Name", "desValue": "I327873"},{"desName" : "Display Name","desValue": "Joyce Ning"},{"desName" : "Connect Power","desValue": "0.641025641"},{"desName" : "Cost Center","desValue": "GCN Services Head"},{"desName" : "Location","desValue": "Beijing"},{"desName" : "Display Name","desValue": "Joyce Ning"},{"desName" : "Functional Area","desValue": "Sales & Presales"},{"desName" : "Board Area","desValue": "Global Customer Operations"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "Jack",
  "des": [
  {"desName" : "Display Name","desValue": "Jack"},
  {"desName" : "Connect Power","desValue": "0.674763833"},
  {"desName" : "Cost Center","desValue": "Sales Support Level 2 CN"},
  {"desName" : "Location","desValue": "Beijing"},
  {"desName" : "Functional Area","desValue": "Sales & Presales"},
  {"desName" : "Board Area","desValue": "Intelligent Enterprise Group"}],
  "symbolSize": 15,"category": 0,"nodeType": 0,
  label: {
      normal: {
        show: true
      }
    }},
{"name": "I332466",
    "des": [
      {"desName" : "Name", "desValue": "I332466"},{"desName" : "Display Name","desValue": "Sean He"},{"desName" : "Connect Power","desValue": "0.728862974"},{"desName" : "Cost Center","desValue": "TI SAP CP DWP Mobile Services (CHN)"},{"desName" : "Location","desValue": "Beijing"},{"desName" : "Display Name","desValue": "Sean He"},{"desName" : "Functional Area","desValue": "Development"},{"desName" : "Board Area","desValue": "Technology & Innovation"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I332481",
  "des": [{"desName" : "Name", "desValue": "I332481"},{"desName" : "Display Name","desValue": "Ivy Yang"},{"desName" : "Connect Power","desValue": "0.618811881"},{"desName" : "Cost Center","desValue": "Cloud HCM Engineering - Suite (CN)"},{"desName" : "Location","desValue": "Shanghai"},{"desName" : "Display Name","desValue": "Ivy Yang"},{"desName" : "Functional Area","desValue": "Development"},{"desName" : "Board Area","desValue": "Cloud Business Group"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I332553",
  "des": [
    {"desName" : "Display Name","desValue": "Hui Zhang"},{"desName" : "Connect Power","desValue": "0.628140704"},
    {"desName" : "Cost Center","desValue": "TR Greater China"},{"desName" : "Location","desValue": "Beijing"},
    {"desName" : "Functional Area","desValue": "Human Resources"},{"desName" : "Board Area","desValue": "Human Resources"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I333502",
  "des": [
    {"desName" : "Display Name","desValue": "Zhi-feng Deng"},{"desName" : "Connect Power","desValue": "0.761035008"},
    {"desName" : "Cost Center","desValue": "TI SAP CP DWP Mobile Services (CHN)"},
    {"desName" : "Location","desValue": "Beijing"},
    {"desName" : "Functional Area","desValue": "Development"},{"desName" : "Board Area","desValue": "Technology & Innovation"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I333714",
  "des": [{"desName" : "Name", "desValue": "I333714"},{"desName" : "Display Name","desValue": "Qianqian Wei"},{"desName" : "Connect Power","desValue": "0.586166471"},{"desName" : "Cost Center","desValue": "DBS GC Marketing & Communication"},{"desName" : "Location","desValue": "Beijing"},{"desName" : "Display Name","desValue": "Qianqian Wei"},{"desName" : "Functional Area","desValue": "Services"},{"desName" : "Board Area","desValue": "Digital Business Services"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I335507",
  "des": [
    {"desName" : "Name", "desValue": "I335507"},{"desName" : "Display Name","desValue": "Sophia Tao"},{"desName" : "Connect Power","desValue": "0.628140704"},{"desName" : "Cost Center","desValue": "Regional OP Comissions CN Holding"},{"desName" : "Location","desValue": "Beijing"},{"desName" : "Display Name","desValue": "Sophia Tao"},{"desName" : "Functional Area","desValue": "Finance"},{"desName" : "Board Area","desValue": "Finance & Administration"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I337932",
    "des": [{"desName" : "Name", "desValue": "I337932"},{"desName" : "Display Name","desValue": "Jizu Sun"},{"desName" : "Connect Power","desValue": "0.570776256"},{"desName" : "Cost Center","desValue": "PS Digital Support Experience Platform _"},{"desName" : "Location","desValue": "Shanghai"},{"desName" : "Display Name","desValue": "Jizu Sun"},{"desName" : "Functional Area","desValue": "Development"},{"desName" : "Board Area","desValue": "Digital Business Services"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I339159",
    "des": [{"desName" : "Name", "desValue": "I339159"},{"desName" : "Display Name","desValue": "Emma Ma"},{"desName" : "Connect Power","desValue": "0.777604977"},{"desName" : "Cost Center","desValue": "PE Innovation CN CFI"},{"desName" : "Location","desValue": "Beijing"},{"desName" : "Display Name","desValue": "Emma Ma"},{"desName" : "Functional Area","desValue": "Development"},{"desName" : "Board Area","desValue": "Intelligent Enterprise Group"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I340913","des": [
  {"desName" : "Name", "desValue": "I340913"},
  {"desName" : "Display Name","desValue": "Kun Lv"},{"desName" : "Connect Power","desValue": "0.750750751"},{"desName" : "Cost Center","desValue": "Legal - SAP China"},{"desName" : "Location","desValue": "Beijing"},{"desName" : "Display Name","desValue": "Kun Lv"},{"desName" : "Functional Area","desValue": "General Management & Admin"},{"desName" : "Board Area","desValue": "Finance & Administration"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I345069",
  "des": [{"desName" : "Name", "desValue": "I345069"},{"desName" : "Display Name","desValue": "Laura Li"},{"desName" : "Connect Power","desValue": "0.641025641"},{"desName" : "Cost Center","desValue": "IMC North & AD"},{"desName" : "Location","desValue": "Beijing"},{"desName" : "Display Name","desValue": "Laura Li"},{"desName" : "Functional Area","desValue": "Sales & Presales"},{"desName" : "Board Area","desValue": "Global Customer Operations"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I350495","des": [
  {"desName" : "Name", "desValue": "I350495"},
  {"desName" : "Display Name","desValue": "Evie Wu"},{"desName" : "Connect Power","desValue": "0.755287009"},{"desName" : "Cost Center","desValue": "GB North"},{"desName" : "Location","desValue": "Beijing"},{"desName" : "Display Name","desValue": "Evie Wu"},{"desName" : "Functional Area","desValue": "Sales & Presales"},{"desName" : "Board Area","desValue": "Global Customer Operations"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I350995",
  "des": [
    {"desName" : "Name", "desValue": "I350995"},{"desName" : "Display Name","desValue": "Ming-zhi Wang"},{"desName" : "Connect Power","desValue": "0.67114094"},{"desName" : "Cost Center","desValue": "CN Presales-Product-S4"},{"desName" : "Location","desValue": "Beijing"},{"desName" : "Display Name","desValue": "Ming-zhi Wang"},{"desName" : "Functional Area","desValue": "Sales & Presales"},{"desName" : "Board Area","desValue": "Global Customer Operations"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I501540",
    "des": [{"desName" : "Name", "desValue": "I501540"},{"desName" : "Display Name","desValue": "Wang, Hanson"},{"desName" : "Connect Power","desValue": "0.570776256"},{"desName" : "Cost Center","desValue": "GCS DataCenter Mgmt&Infra China"},{"desName" : "Location","desValue": "Shanghai"},{"desName" : "Display Name","desValue": "Wang, Hanson"},{"desName" : "Functional Area","desValue": "Information Technology"},{"desName" : "Board Area","desValue": "Intelligent Enterprise Group"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I501704",
  "des": [
    {"desName" : "Display Name","desValue": "Wang, Sabrina"},{"desName" : "Connect Power","desValue": "0.796178344"},
    {"desName" : "Cost Center","desValue": "Legal - SAP China"},
    {"desName" : "Location","desValue": "Beijing"},
    {"desName" : "Functional Area","desValue": "General Management & Admin"},{"desName" : "Board Area","desValue": "Finance & Administration"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I505432",
  "des": [{"desName" : "Name", "desValue": "I505432"},{"desName" : "Display Name","desValue": "Zhan, Sindy"},{"desName" : "Connect Power","desValue": "0.570776256"},{"desName" : "Cost Center","desValue": "AliCloud (CN)"},{"desName" : "Location","desValue": "Shanghai"},{"desName" : "Display Name","desValue": "Zhan, Sindy"},{"desName" : "Functional Area","desValue": "Development"},{"desName" : "Board Area","desValue": "Technology & Innovation"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I507603",
  "des": [{"desName" : "Name", "desValue": "I507603"},{"desName" : "Display Name","desValue": "Cheng, Eric"},{"desName" : "Connect Power","desValue": "0.570776256"},{"desName" : "Cost Center","desValue": "Concur Services CHN"},{"desName" : "Location","desValue": "Dalian"},{"desName" : "Display Name","desValue": "Cheng, Eric"},{"desName" : "Functional Area","desValue": "Services"},{"desName" : "Board Area","desValue": "Cloud Business Group"}],"symbolSize": 15,"category": 0,"nodeType": 0},
{"name": "I508178",
  "des": [{"desName" : "Name", "desValue": "I508178"},{"desName" : "Display Name","desValue": "Chen, Winstom"},{"desName" : "Connect Power","desValue": "0.570776256"},{"desName" : "Cost Center","desValue": "Public Service "},{"desName" : "Location","desValue": "Beijing"},{"desName" : "Display Name","desValue": "Chen, Winstom"},{"desName" : "Functional Area","desValue": "Sales & Presales"},{"desName" : "Board Area","desValue": "Global Customer Operations"}],"symbolSize": 15,"category": 0,"nodeType": 0},

        {
          "name": "Cloud Teaching Project",
          "des": "Cloud Teaching Project",
          "symbolSize": 15,
          "category": 1,
          "nodeType": 1,
          label: {
            normal: {
              show: true
            }
          }
        },
        {
          "name": "Happy Camp",
          "des": "Happy Camp",
          "symbolSize": 15,
          "category": 1,
          "nodeType": 1,
          label: {
            normal: {
              show: true
            }
          }
        },
        {
          "name": "Spring Buds Project",
          "des": [
            {
                desName : "Initiative",
                desValue: "Good"
            },
            {
                desName : "Social Impact",
                desValue: "Excellent"
            },
            {
                desName : "People Engagement",
                desValue: "Excellent"
            },
            {
                desName : "Satisfaction",
                desValue: "Excellent"
            },
            {
                desName : "Recommendation",
                desValue: "High"
            }
        ],
          "symbolSize": 15,
          "category": 1,
          "nodeType": 1,
          label: {
            normal: {
              show: true
            }
          }
        }],
        links: [
        { 'source': "Cloud Teaching Project", 'target': 'I311783', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'I332481', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'C5287078', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'I306809', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'I033209', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'Amy', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'I320247', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'I029913', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'I505432', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'I007238', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'I303519', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'I068096', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'I075689', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'I501540', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'I064390', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'I308129', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'I070172', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'I048976', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'I337932', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'I075198', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'I300027', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'I044063', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'Jack', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'I076298', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'I077125', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'I321210', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'I345069', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'I310095', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'I074438', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'I065345', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'I310190', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'I508178', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'I317106', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'I339159', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'I327873', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'I028618', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'Kate', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'I059477', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'I029176', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'I345069', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'I507603', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'I069410', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'I037760', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'I322282', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'I069176', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'I306528', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'I317087', 'des': '' },
        { 'source': "Cloud Teaching Project", 'target': 'I350495', 'des': '' },
        { 'source': "Happy Camp", 'target': 'I300027', 'des': '' },
        { 'source': "Happy Camp", 'target': 'Amy', 'des': '' },
        { 'source': "Happy Camp", 'target': 'I075198', 'des': '' },
        { 'source': "Happy Camp", 'target': 'I063174', 'des': '' },
        { 'source': "Happy Camp", 'target': 'I062604', 'des': '' },
        { 'source': "Happy Camp", 'target': 'C5288676', 'des': '' },
        { 'source': "Happy Camp", 'target': 'Sherry', 'des': '' },
        { 'source': "Happy Camp", 'target': 'I501704', 'des': '' },
        { 'source': "Happy Camp", 'target': 'I332553', 'des': '' },
        { 'source': "Happy Camp", 'target': 'I333502', 'des': '' },
        { 'source': "Happy Camp", 'target': 'I068789', 'des': '' },
        { 'source': "Happy Camp", 'target': 'I074438', 'des': '' },
        { 'source': "Happy Camp", 'target': 'I063171', 'des': '' },
        { 'source': "Happy Camp", 'target': 'I310074', 'des': '' },
        { 'source': "Happy Camp", 'target': 'I501704', 'des': '' },
        { 'source': "Happy Camp", 'target': 'I340913', 'des': '' },
        { 'source': "Happy Camp", 'target': 'I063114', 'des': '' },
        { 'source': "Happy Camp", 'target': 'I073098', 'des': '' },
        { 'source': "Happy Camp", 'target': 'I038245', 'des': '' },
        { 'source': "Happy Camp", 'target': 'I317106', 'des': '' },
        { 'source': "Happy Camp", 'target': 'I044063', 'des': '' },
        { 'source': "Happy Camp", 'target': 'I350495', 'des': '' },
        { 'source': "Happy Camp", 'target': 'I062837', 'des': '' },
        { 'source': "Happy Camp", 'target': 'I350995', 'des': '' },
        { 'source': "Happy Camp", 'target': 'I037383', 'des': '' },
        { 'source': "Happy Camp", 'target': 'I318559', 'des': '' },
        { 'source': "Happy Camp", 'target': 'C5264891', 'des': '' },
        { 'source': "Happy Camp", 'target': 'I057004', 'des': '' },
        { 'source': "Happy Camp", 'target': 'I062544', 'des': '' },
        { 'source': "Happy Camp", 'target': 'I333714', 'des': '' },
        { 'source': "Happy Camp", 'target': 'I041571', 'des': '' },
        { 'source': "Happy Camp", 'target': 'I335507', 'des': '' },
        { 'source': "Happy Camp", 'target': 'I317228', 'des': '' },
        { 'source': "Happy Camp", 'target': 'I332466', 'des': '' },
        { 'source': "Happy Camp", 'target': 'I075255', 'des': '' },
        { 'source': "Happy Camp", 'target': 'I063769', 'des': '' },
        { 'source': "Happy Camp", 'target': 'I062703', 'des': '' },
        { 'source': "Happy Camp", 'target': 'Sherry', 'des': '' },
        { 'source': "Spring Buds Project", 'target': 'Amy', 'des': '' },
        { 'source': "Spring Buds Project", 'target': 'Kate', 'des': '' },
        { 'source': "Spring Buds Project", 'target': 'Sherry', 'des': '' }
        ],
        categories: categories,
      }]
    };
    myChart.setOption(option);
    // bindChartClickEvent(myChart);

    /** 
     * 获取颜色 
     * @param colors 
     * @param index 
     * @returns {*} 
     */
    function getColor(colors, index) {
      var length = colors.length,
        colorIndex = index;
      if (index >= length) {
        colorIndex = length - index;
      }
      return colors[colorIndex];
    }
    /** 
     * 绑定图表的点击事件 
     * @param chart 
     */

    function bindChartClickEvent(chart) {
      chart.on('click', function (params) {
        var category = params.data.category,
          nodeType = params.data.nodeType;
        if (category === 0 || nodeType === 1) {
          toggleShowNodes(chart, params);
        }
      });
    }

    /** 
     * 展开或关闭节点 
     * @param chart 
     * @param params 
     */


    function toggleShowNodes(chart, params) {
      var open = !!params.data.open,
        options = chart.getOption(),
        seriesIndex = params.seriesIndex,
        srcLinkName = params.name,
        serieLinks = options.series[seriesIndex].links,
        serieData = options.series[seriesIndex].data,
        serieDataMap = new Map(),
        serieLinkArr = [];
      // 当前根节点是展开的，那么就需要关闭所有的根节点  
      if (open) {
        // 递归找到所有的link节点的target的值  
        findLinks(serieLinkArr, srcLinkName, serieLinks, true);
        if (serieLinkArr.length) {
          serieData.forEach(sd => serieDataMap.set(sd.name, sd));
          for (var i = 0; i < serieLinkArr.length; i++) {
            if (serieDataMap.has(serieLinkArr[i])) {
              var currentData = serieDataMap.get(serieLinkArr[i]);
              currentData.category = -Math.abs(currentData.category);
              if (currentData.nodeType === 1) {
                currentData.open = false;
              }
            }
          }
          serieDataMap.get(srcLinkName).open = false;
          chart.setOption(options);
        }
      } else {
        // 当前根节点是关闭的，那么就需要展开第一层根节点  
        findLinks(serieLinkArr, srcLinkName, serieLinks, false);
        if (serieLinkArr.length) {
          serieData.forEach(sd => serieDataMap.set(sd.name, sd));
          for (var j = 0; j < serieLinkArr.length; j++) {
            if (serieDataMap.has(serieLinkArr[j])) {
              var currentData = serieDataMap.get(serieLinkArr[j]);
              currentData.category = Math.abs(currentData.category);
            }
          }
          serieDataMap.get(srcLinkName).open = true;
          chart.setOption(options);
        }
      }
    }

    /** 
     * 查找连接关系 
     * @param links 返回的节点放入此集合 
     * @param srcLinkName 源线的名称 
     * @param serieLinks 需要查找的集合 
     * @param deep 是否需要递归进行查找 
     */


    function findLinks(links, srcLinkName, serieLinks, deep) {
      var targetLinks = [];
      serieLinks.filter(link => link.source === srcLinkName).forEach(link => {
        targetLinks.push(link.target);
        links.push(link.target)
      });
      if (deep) {
        for (var i = 0; i < targetLinks.length; i++) {
          findLinks(links, targetLinks[i], serieLinks, deep);
        }
      }
    }  
}

/** 
 * 获取颜色 
 * @param colors 
 * @param index 
 * @returns {*} 
 */
function getColor(colors, index) {
    var length = colors.length,
    colorIndex = index;
    if (index >= length) {
    colorIndex = length - index;
    }
    return colors[colorIndex];
}

/** 
 * 绑定图表的点击事件 
 * @param chart 
 */
function bindChartClickEvent(chart) {
    chart.on('click', function (params) {
    var category = params.data.category,
        nodeType = params.data.nodeType;
    if (category === 0 || nodeType === 1) {
        toggleShowNodes(chart, params);
    }
    });
}

/** 
 * 展开或关闭节点 
 * @param chart 
 * @param params 
 */
function toggleShowNodes(chart, params) {
    var open = !!params.data.open,
    options = chart.getOption(),
    seriesIndex = params.seriesIndex,
    srcLinkName = params.name,
    serieLinks = options.series[seriesIndex].links,
    serieData = options.series[seriesIndex].data,
    serieDataMap = new Map(),
    serieLinkArr = [];
    // 当前根节点是展开的，那么就需要关闭所有的根节点  
//   if (open) {
//     // 递归找到所有的link节点的target的值  
//     findLinks(serieLinkArr, srcLinkName, serieLinks, true);
//     if (serieLinkArr.length) {
//       serieData.forEach(sd => serieDataMap.set(sd.name, sd));
//       for (var i = 0; i < serieLinkArr.length; i++) {
//         if (serieDataMap.has(serieLinkArr[i])) {
//           var currentData = serieDataMap.get(serieLinkArr[i]);
//           currentData.category = -Math.abs(currentData.category);
//           if (currentData.nodeType === 1) {
//             currentData.open = false;
//           }
//         }
//       }
//       serieDataMap.get(srcLinkName).open = false;
//       chart.setOption(options);
//     }
//   } else {
    // 当前根节点是关闭的，那么就需要展开第一层根节点  
    findLinks(serieLinkArr, srcLinkName, serieLinks, false);
    if (serieLinkArr.length) {
        serieData.forEach(sd => serieDataMap.set(sd.name, sd));
        for (var j = 0; j < serieLinkArr.length; j++) {
        if (serieDataMap.has(serieLinkArr[j])) {
            var currentData = serieDataMap.get(serieLinkArr[j]);
            currentData.category = Math.abs(currentData.category);
        }
        }
        serieDataMap.get(srcLinkName).open = true;
        chart.setOption(options);
    // }
    }
}

/** 
 * 查找连接关系 
 * @param links 返回的节点放入此集合 
 * @param srcLinkName 源线的名称 
 * @param serieLinks 需要查找的集合 
 * @param deep 是否需要递归进行查找 
 */


function findLinks(links, srcLinkName, serieLinks, deep) {
    var targetLinks = [];
    serieLinks.filter(link => link.source === srcLinkName).forEach(link => {
    targetLinks.push(link.target);
    links.push(link.target)
    });
    if (deep) {
    for (var i = 0; i < targetLinks.length; i++) {
        findLinks(links, targetLinks[i], serieLinks, deep);
    }
    }
} 