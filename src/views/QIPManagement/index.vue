<template>
  <div class="app-container">
    <div
      class="filter-container"
      @keyup.space.native="onkeyupspace"
    >
      <!-- heard begin -->
      <el-row :gutter="20">
        <!-- heard left begin -->
        <el-col :span="12">
          <el-card class="box-card">
            <el-table
              :key="tableKey"
              ref="multipleSizeTable"
              v-loading="SizelistLoading"
              :data="Sizelist"
              border
              fit
              max-height="600"
              style="width: 100%"
              @sort-change="sortChange"
              @row-click="handleSizerowclickChange"
            >
              <el-table-column
                type="selection"
                width="40"
              />
              <el-table-column
                prop="id"
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
        </el-col>
        <!-- heard left end -->
        <!-- heard regiht begin -->
        <el-col :span="12">
          <el-card class="box-card">
            <el-date-picker
              v-model="Datetimes"
              format="yyyy-MM-dd"
              type="datetimerange"
              style="width: 250px;"
              :start-placeholder="$t('Qipmanage.BeginDate')"
              :end-placeholder="$t('Qipmanage.EndDate')"
            />
            <el-input
              v-model="listQuery.title"
              placeholder="JHVNO"
              style="width: 150px;margin-top:8px;margin-left:5px;"
              class="filter-item"
              :autofocus="true"
              @keyup.enter.native="handleFilter"
            />
            <el-button
              v-waves
              class="filter-item"
              type="primary"
              style="margin-top:8px;margin-left:5px;"
              icon="el-icon-search"
              @click="handleFilter"
            >
              {{ $t('table.search') }}
            </el-button>
            <!-- <el-input
              ref="inputBarcode"
              v-model="listQuery.title"
              :placeholder="$t('Qipmanage.BarCode')"
              style="margin-top:5px"
            />-->
          </el-card>
          <el-card class="box-card">
            <div class="grid-content bg-purple">
              <el-table
                :key="tableKey"
                ref="multipleTable"
                v-loading="listLoading"
                :data="list"
                border
                fit
                style="width: 100%;"
                max-height="360"
                highlight-current-row
                @sort-change="sortChange"
                @row-click="handleSelectionChange"
              >
                <!-- @selection-change="handleSelectionChange" -->
                <el-table-column
                  type="selection"
                  width="40"
                  prop="id"
                />
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
                  class="card-panel-error"
                  @click="handlefilled()"
                >
                  <div class="card-panel-icon-wrapper close-filled">
                    <i class="el-icon-close" />
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
                  class="card-panel-success"
                  @click="handlesuccess"
                >
                  <div class="card-panel-icon-wrapper icon-check">
                    <i class="el-icon-check" />
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
        <!-- heard regiht end -->
      </el-row>
      <!-- heard end -->
    </div>
    <!-- centent begin -->
    <el-row :gutter="20">
      <!-- left begin -->

      <!-- left end -->
    </el-row>
    <!-- centent end -->
    <!-- dialog error begin -->
    <el-dialog
      :modal="true"
      :show-close="true"
      top="2vh"
      width="90%"
      :fullscreen="true"
      :close-on-press-escape="true"
      :visible.sync="dialogdetail"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card class="box-card">
            <div class="grid-content bg-purple" />
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
        <el-card>
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
            <el-radio-button
              label="UK11"
              style="margin:15px;"
              border
            />
            <el-radio-button
              label="UK12"
              style="margin:15px;"
              border
            />
            <el-radio-button
              label="UK13"
              style="margin:15px;"
              border
            />
            <el-radio-button
              label="UK14"
              style="margin:15px;"
              border
            />
            <el-radio-button
              label="UK15"
              style="margin:15px;"
              border
            />
            <el-radio-button
              label="UK16"
              style="margin:15px;"
              border
            />
            <el-radio-button
              label="UK17"
              style="margin:15px;"
              border
            />
            <el-radio-button
              label="UK18"
              style="margin:15px;"
              border
            />
            <el-radio-button
              label="UK19"
              style="margin:15px;"
              border
            />
            <el-radio-button
              label="UK20"
              style="margin:15px;"
              border
            />
          </el-radio-group>
        </el-card>
      </div>
    </el-dialog>
    <!-- dialog error begin -->
  </div>
</template>

<script lang="ts" src='./index.ts' type="javascript">
</script>

<style lang="scss" scoped>
.el-table__body tr.current-row > td {
  background: #f87c08;
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
  .card-panel-error {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #f30606;
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
        text-align: center;
        color: hsla(0, 6%, 94%, 0.993);
        font-size: 25px;
      }
    }
  }
  .card-panel-success {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #087904f8;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
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
      .card-panel-text-success {
        text-align: center;
        line-height: 18px;
        color: hsla(0, 6%, 94%, 0.993);
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
