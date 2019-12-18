<template>
  <div class="app-container">
    <div
      class="filter-container"
      @keyup.space.native="onkeyupspace"
    >
      <el-card class="box-card">
        <el-date-picker
          v-model="Datetimes"
          format="yyyy-MM-dd"
          type="datetimerange"
          style="width: 300px;"
          :start-placeholder="$t('Qipmanage.BeginDate')"
          :end-placeholder="$t('Qipmanage.EndDate')"
        />
        <el-input
          v-model="listQuery.title"
          placeholder="JHVNO"
          style="width: 200px;margin-top:8px;"
          class="filter-item"
          :autofocus="true"
          @keyup.enter.native="handleFilter"
        />
        <el-button
          v-waves
          class="filter-item"
          type="primary"
          style="margin-top:8px;"
          icon="el-icon-search"
          @click="handleFilter"
        >
          {{ $t('table.search') }}
        </el-button>
      </el-card>
    </div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <div class="grid-content bg-purple">
            <el-table
              :key="tableKey"
              ref="singleTable"
              v-loading="listLoading"
              :data="list"
              border
              fit
              style="width: 100%;"
              @sort-change="sortChange"
            >
              <el-table-column
                :label="$t('table.id')"
                prop="id"
                sortable="custom"
                align="center"
                width="80"
                :class-name="getSortClass('id')"
                @selection-change="handleSelectionChange"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.id }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="JHVNO"
                label="JHVNO"
              />
              <el-table-column
                prop="colorNum"
                label="色号"
              />
              <el-table-column
                prop="importance"
                label="订单总量"
              />
              <el-table-column
                :label="$t('table.date')"
                width="150px"
                align="center"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d}') }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
        <el-card>
          <el-row
            :gutter="40"
            class="panel-group"
          >
            <el-col
              :xs="12"
              :sm="12"
              :lg="12"
              class="card-panel-col"
            >
              <div
                class="card-panel"
                @click="handlefilled('error')"
              >
                <div class="card-panel-icon-wrapper close-filled">
                  <svg-icon
                    icon-class="close-filled"
                    class-name="card-panel-icon"
                  />
                </div>
                <div class="card-panel-description">
                  <div class="card-panel-text-error">
                    {{ $t('Qipmanage.error') }}
                  </div>
                </div>
              </div>
            </el-col>
            <el-col
              :xs="12"
              :sm="12"
              :lg="12"
              class="card-panel-col"
            >
              <div
                class="card-panel"
                @click="handlefilled('success')"
              >
                <div class="card-panel-icon-wrapper icon-check">
                  <svg-icon
                    icon-class="check-filled"
                    class-name="card-panel-icon"
                  />
                </div>
                <div class="card-panel-description">
                  <div class="card-panel-text-success">
                    {{ $t('Qipmanage.success') }}
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <el-row class="row-bg">
              <el-col :span="12">
                <el-input
                  v-model="listQuery.title"
                  placeholder="JHVNO"
                  style="width: 200px;margin-top:5px"
                  class="filter-item"
                  disabled
                />
                <el-input
                  v-model="listQuery.title"
                  :placeholder="$t('Qipmanage.ColorName')"
                  style="width: 200px;margin-top:5px"
                  class="filter-item"
                  disabled
                />
                <el-input
                  ref="inputBarcode"
                  v-model="listQuery.title"
                  :placeholder="$t('Qipmanage.BarCode')"
                  style="width: 300px;margin-top:40px"
                  class="filter-item"
                />
              </el-col>
              <el-col :span="12">
                <img
                  src="http://localhost:8081/images/Dispatch/1aaa187a-3e5b-462e-915d-c31f526d148d.jpg"
                  class="tableimage"
                >
              </el-col>
            </el-row>
          </el-card>
          <el-card class="box-card">
            <el-table
              :key="tableKey"
              v-loading="listLoading"
              :data="list"
              border
              fit
              style="width: 100%;"
              @sort-change="sortChange"
            >
              <el-table-column
                prop="Size"
                label="SIZE"
              />
              <el-table-column
                prop="importance"
                label="订单数量"
              />
              <el-table-column
                prop="succnum"
                label="合格数量"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.succnum }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="failednum"
                label="不合格数量"
              >
                <template slot-scope="scope">
                  <span style="color:red">{{ scope.row.failednum }}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      :center="true"
      top="35vh"
      :modal="true"
      :show-close="false"
      :visible.sync="dialogPvVisible"
      :title="$t('Qipmanage.SizeTitle')"
    >
      <div>
        <el-radio-group
          v-model="radioUK"
          text-color="#fffff"
          :fill="radiofill"
        >
          <div style="margin:5px;">
            <el-radio-button
              label="UK1"
              style="margin:15px;"
              border
            />
            <el-radio-button
              label="UK2"
              style="margin:15px;"
              border
            />
            <el-radio-button
              label="UK3"
              style="margin:15px;"
              border
            />
            <el-radio-button
              label="UK4"
              style="margin:15px;"
              border
            />
            <el-radio-button
              label="UK5"
              style="margin:15px;"
              border
            />
          </div>
          <div style="margin:5px;">
            <el-radio-button
              label="UK6"
              style="margin:15px;"
              border
            />
            <el-radio-button
              label="UK7"
              style="margin:15px;"
              border
            />
            <el-radio-button
              label="UK8"
              style="margin:15px;"
              border
            />
            <el-radio-button
              label="UK9"
              style="margin:15px;"
              border
            />
            <el-radio-button
              label="UK10"
              style="margin:15px;"
              border
            />
          </div>
        </el-radio-group>
      </div>
      <div slot="footer">
        <el-button @click="dialogPvVisible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button
          type="primary"
          @click="dialogPvVisible = false"
        >
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      :modal="true"
      :show-close="false"
      top="2vh"
      width="90%"
      :visible.sync="dialogdetail"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card class="box-card">
            <div class="grid-content bg-purple">
              <el-radio-group
                v-model="radioUKerror"
                text-color="#fffff"
                fill="#f30606"
              >
                <el-radio-button
                  label="UK1"
                  style="margin:15px;"
                  border
                />
                <el-radio-button
                  label="UK2"
                  style="margin:15px;"
                  border
                />
                <el-radio-button
                  label="UK3"
                  style="margin:15px;"
                  border
                />
                <el-radio-button
                  label="UK4"
                  style="margin:15px;"
                  border
                />
                <el-radio-button
                  label="UK5"
                  style="margin:15px;"
                  border
                />
                <el-radio-button
                  label="UK6"
                  style="margin:15px;"
                  border
                />
                <el-radio-button
                  label="UK7"
                  style="margin:15px;"
                  border
                />
                <el-radio-button
                  label="UK8"
                  style="margin:15px;"
                  border
                />
                <el-radio-button
                  label="UK9"
                  style="margin:15px;"
                  border
                />
                <el-radio-button
                  label="UK10"
                  style="margin:15px;"
                  border
                />
              </el-radio-group>
            </div>
          </el-card>
          <el-card>
            <div slot="header">
              <span>{{ $t('Qipmanage.selecterror') }}</span>
            </div>
            <el-radio-group
              v-model="radioMessage"
              text-color="#fffff"
            >
              <el-radio-button
                v-for="error in errorLists"
                :key="error"
                style="margin:15px;height:30px"
                :label="error"
              />
              <el-select
                v-model="value"
                filterable
                clearable
                placeholder="其他原因"
              >
                <el-option
                  v-for="item in errorselsLists"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-radio-group>
          </el-card>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-card class="box-card">
              <el-row class="row-bg">
                <el-col :span="12">
                  <el-input
                    v-model="listQuery.title"
                    placeholder="JHVNO"
                    style="width: 200px;margin:5px"
                    class="filter-item"
                    disabled
                  />
                  <el-input
                    v-model="listQuery.title"
                    :placeholder="$t('Qipmanage.ColorName')"
                    style="width: 200px;margin:5px"
                    class="filter-item"
                    disabled
                  />
                  <el-input
                    v-model="listQuery.title"
                    :placeholder="$t('Qipmanage.Size')"
                    style="width: 100px;margin:5px"
                    class="filter-item"
                    disabled
                  />
                </el-col>
                <el-col :span="12">
                  <img
                    src="http://localhost:8081/images/Dispatch/1aaa187a-3e5b-462e-915d-c31f526d148d.jpg"
                    class="tableimage"
                  >
                </el-col>
              </el-row>
            </el-card>
            <el-card class="box-card">
              <el-tabs type="border-card">
                <el-tab-pane :label="$t('Qipmanage.Image')">
                  <CanvasFilaed
                    width="400"
                    height="700"
                    url="http://localhost:8081/images/Imagetemplater/3.png"
                  />
                </el-tab-pane>
                <el-tab-pane :label="$t('Qipmanage.Report')">
                  <el-table
                    :key="tableKey"
                    ref="singleTable"
                    v-loading="listLoading"
                    :data="list"
                    border
                    fit
                    style="width: 100%;"
                    :highlight-current-row="true"
                    @sort-change="sortChange"
                  >
                    <el-table-column
                      :label="$t('table.id')"
                      prop="id"
                      sortable="custom"
                      align="center"
                      width="80"
                      :class-name="getSortClass('id')"
                    >
                      <template slot-scope="scope">
                        <span>{{ scope.row.id }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="$t('Qipmanage.Result')"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d}') }}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
              </el-tabs>
            </el-card>
          </div>
        </el-col>
      </el-row>
      <div
        slot="title"
        align="center"
      >
        <el-button
          type="danger"
          @click="dialogdetail = false"
        >
          {{ $t('table.cancel') }}
        </el-button>
        <el-button
          type="primary"
          @click="dialogdetail = false"
        >
          {{ $t('Qipmanage.Save') }}
        </el-button>
        <el-button
          type="success"
          @click="dialogdetail = false"
        >
          {{ $t('Qipmanage.SaveContinue') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" src='./index.ts' type="javascript">
</script>

<style lang="scss" scoped>
.el-table .warning-row {
  background: #f8b808;
}
.tableimage {
  width: 200px;
  height: 100px;
  vertical-align: middle;
  margin-right: 12px;
}
.DivImageback {
  width: 400px;
  height: 640px;
  height: auto;
  margin: 0 auto;
  position: relative;
}
.DivImageback img {
  width: 100%;
}
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .close-filled {
        background: #f30606;
      }

      .icon-check {
        background: #087904f8;
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      align-content: center;
      font-weight: bolder;
      margin: 45px;
      .card-panel-text-error {
        color: #f50808e0;
        font-size: 25px;
      }

      .card-panel-text-success {
        line-height: 18px;
        color: rgb(19, 122, 15);
        font-size: 25px;
        margin-bottom: 12px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
