import React from 'react';

export default function DetailBlog() {
    return (
        <div>
        <div className="container-fluid p-0 py-5 bg-dark hero-header mb-5">
                <div className="container text-center my-5 pt-5 pb-4">
                    <h1 className="display-3 text-white mb-3 animated slideInDown">Tin tức và mẹo hay</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb justify-content-center text-uppercase">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item"><a href="#">Pages</a></li>
                            <li className="breadcrumb-item text-white active" aria-current="page">Blog</li>
                        </ol>
                    </nav>
                </div>
            </div>
        <div className="container my-5">
        
            <div className="row">
                <div className="col-md-9">
               
                    <div className="mb-5">
                        <h1 className="display-4 mb-4">Tiêu đề chi tiết bài viết</h1>
                        <p className="text-muted">Ngày đăng: 20/08/2024 - Tác giả: Admin</p>
                    </div>

                  
                    <div className="mb-4">
                        <img 
                            src="https://cdn.tgdd.vn/Files/2022/01/25/1412805/cach-nau-pho-bo-nam-dinh-chuan-vi-thom-ngon-nhu-hang-quan-202201250313281452.jpg" 
                            className="img-fluid" 
                            alt="Chi tiết bài viết" 
                            style={{ maxHeight: '500px', objectFit: 'cover', width: '100%' }} 
                        />
                    </div>

                    {/* Blog Content */}
                    <div className="mb-5">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.</p>
                        <p>Proin sed libero enim sed faucibus turpis in eu. Nulla aliquet enim tortor at auctor urna. Elementum nibh tellus molestie nunc non blandit. Massa sapien faucibus et molestie ac feugiat sed lectus. Viverra mauris in aliquam sem fringilla ut morbi. Nunc eget lorem dolor sed viverra ipsum nunc aliquet. Mattis pellentesque id nibh tortor id aliquet lectus. Id venenatis a condimentum vitae sapien pellentesque habitant morbi. Leo integer malesuada nunc vel risus commodo viverra maecenas accumsan. Velit euismod in pellentesque massa placerat duis ultricies lacus sed.</p>
                        <p>Viverra ipsum nunc aliquet bibendum enim facilisis gravida neque convallis. Convallis tellus id interdum velit laoreet id donec ultrices. Id venenatis a condimentum vitae sapien pellentesque habitant morbi tristique. Amet facilisis magna etiam tempor orci eu lobortis elementum. Elit at imperdiet dui accumsan sit amet nulla facilisi. Egestas purus viverra accumsan in nisl nisi scelerisque. Amet aliquam id diam maecenas ultricies mi eget mauris pharetra. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras. Pretium quam vulputate dignissim suspendisse in est ante in.</p>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="col-md-3">
                    <div className="list-group mt-3">
                        <h5 className="mb-4">Bài viết liên quan</h5>
                        <a href="#" className="list-group-item list-group-item-action">
                            <div className="d-flex w-100 justify-content-between">
                                <h6 className="mb-1">Tiêu đề bài viết liên quan 1</h6>
                            </div>
                            <img 
                                src="https://cdn.tgdd.vn/Files/2022/01/25/1412805/cach-nau-pho-bo-nam-dinh-chuan-vi-thom-ngon-nhu-hang-quan-202201250313281452.jpg" 
                                className="img-fluid mt-2" 
                                alt="Bài viết liên quan 1" 
                                style={{ height: '100px', objectFit: 'cover' }} 
                            />
                        </a>
                        </div>
                        <div className="list-group mt-3">
                        <a href="#" className="list-group-item list-group-item-action">
                            <div className="d-flex w-100 justify-content-between">
                                <h6 className="mb-1">Tiêu đề bài viết liên quan 2</h6>
                            </div>
                            <img 
                                src="https://cdn.tgdd.vn/Files/2022/01/25/1412805/cach-nau-pho-bo-nam-dinh-chuan-vi-thom-ngon-nhu-hang-quan-202201250313281452.jpg" 
                                className="img-fluid mt-2" 
                                alt="Bài viết liên quan 2" 
                                style={{ height: '100px', objectFit: 'cover' }} 
                            />
                        </a>
                        </div>
                        <div className="list-group mt-3">
                        <a href="#" className="list-group-item list-group-item-action">
                            <div className="d-flex w-100 justify-content-between">
                                <h6 className="mb-1">Tiêu đề bài viết liên quan 3</h6>
                            </div>
                            <img 
                                src="https://cdn.tgdd.vn/Files/2022/01/25/1412805/cach-nau-pho-bo-nam-dinh-chuan-vi-thom-ngon-nhu-hang-quan-202201250313281452.jpg" 
                                className="img-fluid mt-2" 
                                alt="Bài viết liên quan 3" 
                                style={{ height: '100px', objectFit: 'cover' }} 
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}
