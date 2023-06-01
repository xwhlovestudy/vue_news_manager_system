<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/' }">用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 搜索用户 -->
        <el-input placeholder="请输入用户 Id" v-model="input1" style="width: 300px" clearable @change="getUsersList">
            <el-button slot="append" icon="el-icon-search" @click="searchUserById"></el-button>
        </el-input>
        <el-button type="success" plain @click="userAdd">添加用户</el-button>
        <el-button type="success" plain @click="deleMore">批量删除用户</el-button>
        <!-- 用户信息展示表 -->
        <el-table ref="multipleTable" :data="usersList" tooltip-effect="dark" style="width: 100%"
        @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="id" label="用户 ID" width="220"></el-table-column>
            <el-table-column prop="username" label="用户名" width="140"></el-table-column>
            <el-table-column prop="realName" label="姓名" width="120"></el-table-column>
            <el-table-column prop="status" label="状态" width="100">
            <template slot-scope="scope">
                <el-tag :type="scope.row.status === 0 ? 'primary' : 'success'" disable-transitions>
                    {{ scope.row.status === 0 ? '停用' : '正常'}}
                </el-tag>
            </template>
            </el-table-column>
            <el-table-column prop="createDate" label="创建时间" width="150"></el-table-column>
            <el-table-column prop="updateDate" label="更新时间" width="150"></el-table-column>
            <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" circle @click="editUser(scope.row.id)"></el-button>
                <el-button type="danger" icon="el-icon-delete" circle @click="delUser(scope.row.id)"></el-button>
                <el-button type="success" icon="el-icon-success" circle @click="userInfo(scope.row.id)"></el-button> 
            </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <div class="block" v-if="!input1">
            <el-pagination @size-change="" @current-change="handleCurrentChange"
            :current-page="currentPage" :page-sizes="[10,20,50,100]"   :page-size="pageSize"
            layout="total,sizes,prev,pager,next,jumper"   :total="userAllData.length">
            </el-pagination>
        </div>
        <!-- 添加修改用户信息的弹窗 -->
        <el-dialog title="添加用户" :visible.sync="isShowAddEdit" class="addEdit" :label-width="100 + 'px'" :size="model === 'view' ? 'small' : ''">
            <h1 v-if="model === 'add'">添加用户</h1>
            <h1 v-else-if="model === 'updata'">修改用户</h1>
            <el-form :model="form" ref="ruleForm" :label-width="100 + 'px'" size="mini">
                <el-form-item label="ID：" prop="id">
                <el-input v-model="form.id" autocomplete="off" disabled clearable></el-input>
                </el-form-item>
                <el-form-item label="用户名：" required prop="username">
                <el-input v-model="form.username" autocomplete="off" v-if="model === 'add'" clearable></el-input>
                <el-input v-model="form.username" autocomplete="off" disabled v-else-if="model=='updata'" clearable></el-input>
                </el-form-item>
                <el-form-item label="密码：" required prop="password">
                <el-input v-model="form.password" autocomplete="off" clearable></el-input>
                </el-form-item>
                <el-form-item label="姓名：" prop="realName">
                <el-input v-model="form.realName" autocomplete="off" clearable></el-input>
                </el-form-item>
                <el-form-item label="性别：" prop="gender">
                    <el-select v-model="form.gender" placeholder="请选择性别" style="width: 100%;">
                        <el-option label="男" value="0"></el-option>
                        <el-option label="女" value="1"></el-option>
                        <el-option label="保密" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="电子邮箱：" prop="email">
                <el-input v-model="form.email" autocomplete="off" clearable></el-input>
                </el-form-item>
                <el-form-item label="手机号码：" prop="mobile">
                <el-input v-model="form.mobile" autocomplete="off" clearable></el-input>
                </el-form-item>
                <el-form-item label="状态：" v-if="model === 'updata'" prop="status">
                    <el-select v-model="form.status" placeholder="请选择状态" style="width: 186%;">
                        <el-option label="正常" value="1"></el-option>
                        <el-option label="停用" value="0"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <!-- <el-button @click="isShowAddEdit = false">取 消</el-button> -->
                <el-button @click="isShowAddEdit = false">取 消</el-button>
                <el-button type="primary" v-if="model === 'add'" @click="addPost">确 定</el-button>
                <el-button type="primary" v-else-if="model === 'updata'" @click="upDatePost">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 用户详细信息的弹窗 -->
        <el-dialog title="用户详细信息" :visible.sync="isShowUserInfo" class="userInfo">
        <el-form :model="userInfoForm" label-width="250px">
            <el-form-item label="用户ID:">
                <span>{{userInfoForm.id}}</span>
            </el-form-item>
            <el-form-item label="用户名：">
                <span>{{userInfoForm.username}}</span>
            </el-form-item>
            <el-form-item label="姓名：">
                <span>{{userInfoForm.realName}}</span>
            </el-form-item>
            <el-form-item label="性别：">
                <span v-if='userInfoForm.gender=0'>男</span>
                <span v-else-if='userInfoForm.gender=1'>女</span>
                <span v-else>保密</span>
            </el-form-item>
            <el-form-item label="电子邮箱：">
                <span>{{fuserInfoForm.email}}</span>
            </el-form-item>
            <el-form-item label=”手机号码：>
                <span>{{fuserInfoForm.mobile}}</span>
            </el-form-item>
            <el-form-item label="状态：">
                <span v-if='userInfoForm.status=0'>停用</span>
                <span v-else>正常</span>
            </el-form-item>
            <el-form-item label="创建时间：">
                <span>{{userInfoForm.createDate}}</span>
            </el-form-item>
            <el-form-item label="修改时间：">
                <span>{{userInfoForm.updateDate}}</span>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="isShowUserInfo = false">取 消</el-button>
            <el-button type="primary" @click="isShowUserInfo = false">确 定</el-button>
        </div>
        </el-dialog>
    </div>
</template>
<style>
    .el-main {
        line-height:60px;
    }
</style>

<script>
export default (await import('vue')).defineComponent({
    data () {
        return {
            input1:'',
            usersAllData: [
            ],
            usersList:[
            ],
            value:true,
            totalUserData:100,
            currentPage:1,
            pagesize:10,
            isShowAddEdit:false,
            form:{
                id:"",
                username:"", //用户名
                password:"", //密码
                realName:"", //姓名
                gender:"", //性别 0:男 1:女 2:保密
                emai1:"", //电子邮箱，比如example@qq.com
                mobile:"", //手机号码
                status:"正常", //状态 0:停用 1:正常
            },
            isShowUserInfo:false,
            userInfoForm:[
            ],
            model:"",
        }
    },
    methods:{
        getusersAll(){
            //获取用户全部用户
            //将数据整合（数组里面有对象的形式）赋值给usersA11Data
            this.$http({
                //url:'http://106.54.171.11:9002/api/admin/sysUser/list',
                url:'sysUser/list',
                method:'post',
                //headers:{'token':localStorage.getItem('ttk')},
                data:{
                "page": 1, //当前页码
                "1imit":99999 //每页显示记录数
                },
            }).then((backdata)=>{
                this.usersAllData = backdata.data.data.list
            })
        },
        getUsersList(){
            this.$http({
                url:'sysUser/list',
                method:'post',
                data:{
                "page": this.currentPage, //当前页码
                "limit": this.pageSize //每页显示记录数
                },
            }).then((backdata)=>{
                this.usersList = backdata.data.data.list
            })
        },
        searchUserById(){
            this.usersList = this.userAllData.filter((item)=>{
                return item.id.match(this.input1)
            })
        },
        async getUserInfo(userId){
            var res=await this.this.$http({
                url:'sysUser/info',
                method:'post',
                data:{
                "id": userId
                }
            })
            return res.data.data
        },
        async userInfo(userId){
            this.model="view"
            this.isShowUserInfo = true
            this.userInfoForm = await this.getUserInfo(userId)
        },
        handleSizeChange(size) {
            this.pageSize = size;
            console.log(this.pageSize); //每页下拉显示数据
            this.getUsersList();

        },
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
            console.log(this.currentPage); //点击第几页
            this.getUsersList();

        },
        toggleSelection(rows) {
        if (rows) {
            rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row);
            });
        } else {
            this.$refs.multipleTable.clearSelection();
        }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        deleMore(){
            var deleIds = []
            console.log(this.multipleSelection)
            for(let i=0 ;i<this.multipleSelection.length;i++){
                deleIds.push(this.multipleSelection[i].id)
            }
            // console.log(deleIds)
            this.$confirm("此操作将永久删除以下用户：<br>"+deleIds,'提示',{
            confirmButtonText:'确定',
            cancelButtonText:'取消',
            type:'warning',
            dangerouslyUseHTMLString:true,
            center:true
            }).then(() => {
            this.$message({
                type:'success',
                   message:'删除成功!'
            });
            }).catch(() => {
            this.$message({
                type:'info',
                message:'已取消删除'
            });
            });
        },
        userAdd( ){
            this.isShowAddEdit = true,
            this.model="add"
            this.$nextTick(()=>{
            this.$refs.ruleForm.resetFields();
            })
        },
        addPost(){
            this.$http({
                url:'sysUser/save',
                method:'post',
                data:this.form,
            }).then((backdata)=>{
                console.log(backdata);
                if(backdata.data.msg== 'success'){
                    this.isShowAddEdit = false;
                    //使用el-ui的弹窗提示
                    this.$message({message:'添加成功', type:'success'}); 
                    this.getUsersList();}else{
                        this.$message.error(backdata.data.msg)
                    }
            })
        },
        async editUser(userId){
            this.model = "updata"
            this.form = await this.getUserInfo(userId)
            this.isShowAddEdit=true

        },
        upDatePost(){
            this.$http({
                url:'sysUser/update',
                method:'post',
                data:this.form,
            }).then((backdata)=>{
                if(backdata.data.msg== 'success'){
                    this.isShowAddEdit = false;
                    //使用el-ui的弹窗提示
                    this.$message({message:'修改成功',type:'success'});
                    this.getUsersList();}else{
                        this.smessage.error(backdata.data.msg)
                    }
                })
        },

        delUser(userId){
            this.Shttp({
                // url:'http://106.54.171.11:9002/api/admin/sysUser/deleteurl:'sysUser/delete',
                url:'sysUser/delete',
                method:'post',
                // headers:['token':localStorage.getItem('ttk')),
                data:{
                "id":userId, //当前页码
                },
            }).then((backdata)=>{
                console.log(backdata)
                if(backdata.data.msg== 'success'){
                    //使用el-ui的弹窗提示
                    this.$message({message:'删除成功',type:'success'});
                    this.getUsersList();
                }else{
                    this.$message.error(backdata.data.msg)
                }
            })
        },

    },
    //在页面渲染之前获取用户列表数据
    mounted(){
        this.petUsersA11()
        this.getUsersList()
    },
  })
  </script>



