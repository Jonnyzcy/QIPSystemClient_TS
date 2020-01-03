<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        :placeholder="$t('table.title')"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.type"
        :placeholder="$t('table.type')"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in calendarTypeOptions"
          :key="item.key"
          :label="item.display_name+'('+item.key+')'"
          :value="item.key"
        />
      </el-select>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        {{ $t('table.search') }}
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        {{ $t('table.add') }}
      </el-button>
    </div>
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogpartVisible"
      :modal="true"
      :show-close="false"
      top="2vh"
      width="80%"
    >
      <el-row :gutter="20">
        <el-col :span="14">
          <el-card class="box-card">
            <CanvasFilaed
              width="550"
              height="642"
              url="http://localhost:8081/images/Imagetemplater/3.png"
              v-bind="partList"
              :init-list="inittempList"
              :istemplater="true"
            />
          </el-card>
        </el-col>
        <el-col :span="10">
          <el-card>
            <el-table>
              <el-table-column label="序号" />
              <el-table-column label="部位编码">
                <template>
                  <span>
                    <el-input />
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="部位名称">
                <template>
                  <span>
                    <el-input />
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="坐标点" />
              <el-table-column>
                <template>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleModifyStatus(row,'deleted')"
                  >
                    {{ $t('table.delete') }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
      <div
        slot="title"
        align="center"
      >
        <el-button
          type="danger"
          @click="dialogpartVisible = false"
        >
          {{ $t('table.cancel') }}
        </el-button>
        <el-button
          type="primary"
          @click="dialogpartVisible = false"
        >
          {{ $t('Qipmanage.Save') }}
        </el-button>
        <el-button
          type="success"
          @click="dialogpartVisible = false"
        >
          {{ $t('Qipmanage.SaveContinue') }}
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogPvVisible"
      title="Reading statistics"
    >
      <el-table
        :data="pvData"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column
          prop="key"
          label="Channel"
        />
        <el-table-column
          prop="pv"
          label="Pv"
        />
      </el-table>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="dialogPvVisible = false"
        >{{ $t('table.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang="ts" src="./part.ts">
</script>
