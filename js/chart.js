// 图表初始化
document.addEventListener('DOMContentLoaded', function() {
    // 质量指标对比图
    const qualityCtx = document.getElementById('qualityChart').getContext('2d');
    const qualityChart = new Chart(qualityCtx, {
        type: 'bar',
        data: {
            labels: ['基础3DGS', 'FreeFix', 'GIFSplat', 'ArtiFixer', 'One-Shot Refiner'],
            datasets: [
                {
                    label: 'PSNR (dB) ↑',
                    data: [28.2, 30.0, 29.1, 30.5, 29.7],
                    backgroundColor: 'rgba(59, 130, 246, 0.7)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 1,
                    yAxisID: 'y'
                },
                {
                    label: 'SSIM ↑',
                    data: [0.892, 0.922, 0.912, 0.942, 0.912],
                    backgroundColor: 'rgba(139, 92, 246, 0.7)',
                    borderColor: 'rgba(139, 92, 246, 1)',
                    borderWidth: 1,
                    yAxisID: 'y1'
                },
                {
                    label: 'LPIPS ↓',
                    data: [0.231, 0.173, 0.196, 0.139, 0.162],
                    backgroundColor: 'rgba(236, 72, 153, 0.7)',
                    borderColor: 'rgba(236, 72, 153, 1)',
                    borderWidth: 1,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'PSNR (dB)'
                    },
                    min: 25,
                    max: 32
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'SSIM / LPIPS'
                    },
                    min: 0,
                    max: 1,
                    grid: {
                        drawOnChartArea: false,
                    },
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                if (context.datasetIndex === 0) {
                                    label += context.parsed.y.toFixed(1) + ' dB';
                                } else {
                                    label += context.parsed.y.toFixed(3);
                                }
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });

    // 速度对比图
    const speedCtx = document.getElementById('speedChart').getContext('2d');
    const speedChart = new Chart(speedCtx, {
        type: 'bar',
        data: {
            labels: ['基础3DGS', 'FreeFix', 'GIFSplat', 'ArtiFixer', 'One-Shot Refiner'],
            datasets: [
                {
                    label: '相对速度 (越高越快)',
                    data: [1, 0.5, 8, 0.05, 0.9],
                    backgroundColor: [
                        'rgba(156, 163, 175, 0.7)',
                        'rgba(59, 130, 246, 0.7)',
                        'rgba(139, 92, 246, 0.7)',
                        'rgba(236, 72, 153, 0.7)',
                        'rgba(34, 197, 94, 0.7)'
                    ],
                    borderColor: [
                        'rgba(156, 163, 175, 1)',
                        'rgba(59, 130, 246, 1)',
                        'rgba(139, 92, 246, 1)',
                        'rgba(236, 72, 153, 1)',
                        'rgba(34, 197, 94, 1)'
                    ],
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    type: 'logarithmic',
                    title: {
                        display: true,
                        text: '相对速度 (对数刻度)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + 'x';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let value = context.parsed.y;
                            if (value < 1) {
                                return `速度: ${value.toFixed(2)}x (比基础3DGS慢 ${(1/value).toFixed(0)} 倍)`;
                            } else {
                                return `速度: ${value.toFixed(1)}x (比基础3DGS快 ${value.toFixed(1)} 倍)`;
                            }
                        }
                    }
                }
            }
        }
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 100) {
            nav.classList.add('shadow-md');
            nav.classList.remove('shadow-sm');
        } else {
            nav.classList.remove('shadow-md');
            nav.classList.add('shadow-sm');
        }
    });
});
